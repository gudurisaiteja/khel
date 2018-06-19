const knex = require('./Knex_Configurations.js').knex;
const _ = require('lodash');
const Promise = require('bluebird');

let categoryInfo;
let teamID = 0;
let playerTeamDetailsInsertQuery = 'insert into player_team_details values';
let teamDetailsInsertQuery = 'insert into team_details values';
let query = 'insert into match_details(category_id,team1_id,team2_id) values';
let query1 = ' ';

// Function Calling in sequence of execution
categoryDetails() // Returns records from game_category
    .then(() => { // returns game categories from game_category_details table)
        return categorizePlayers(); // returns players with common interests
    })
    .then(() => {
        return insertIntoPlayerTeamDetails();
    })
    .then(() => {
        return fillMatchDetailsQuery();
    })
    .then(() => {
        return insertIntoMatchDetails();
    });

function categorizePlayers() { // Groups players with common interests together
    return knex('group_details')  // Select unique group ids
        .select('group_id')
        .then(function (groupIDs) {
            const groups = _.map(groupIDs, 'group_id');
            return Promise.map(groups, function (group) { // Get player details, one group at a time
                return loadPlayerInterestDetails(group) // Returns players in a group
                    .then(function (groupMembers) {
                        return _.groupBy(groupMembers, 'category_id'); // Groups players in a group by game category id
                    })
                    .then(function (sortedByCategories) { // categorize according to group, category
                        // Registered Category IDs
                        const categories = Object.values(sortedByCategories);
                        return _.map(categories, function (category) {
                            // Groups players of a specific category, in a group by gender
                            return _.groupBy(category, 'gender');
                        });
                    })
                    // Categorized according to group, category, gender
                    .then(function (sortedByGender) {
                        const playersGroup = _.map(sortedByGender, (genderCategories) => {
                            return _.map(genderCategories, function (players) {
                                return players;
                            });
                        });
                        return Promise.each(playersGroup, function (playersGrp) {
                            return Promise.each(playersGrp, function (players) {
                                return makeTeams(players); // Makes player teams
                            });
                        });
                    });
            });
        });
}


/**
 * Makes Player Teams according to gender, category, group
 * @param {*} players
 */
function makeTeams(players) {
    const playersCount = players.length;
    const categoryID = players[0].category_id;
    // Get team capacity according to category
    const teamCapacity = (_.pick((_.find(categoryInfo, { category_id: categoryID })), 'no_of_players'))['no_of_players'];
    if (playersCount < 2 * teamCapacity) { // If single player is available, then reject
        return 0;
    }
    const extraPlayers = playersCount % (2 * teamCapacity);
    if (extraPlayers !== 0) {
        players.splice(players.length - extraPlayers);
    }
    const chunksOfTeams = _.chunk(players, teamCapacity);  // Divide into teams
    return Promise.each(chunksOfTeams, function (team) {
        return fillTeamDetailsQuery(team, teamCapacity, categoryID);
    });
}

 // Form insert Query for team_details and player_team_details tables
function fillTeamDetailsQuery(teamPlayers, teamCapacity, categoryID) {
    if (teamPlayers.length !== teamCapacity) {
        return 0;
    }
    teamID++;
    const playerIDs = teamPlayers.map(a => a.player_id);
    teamDetailsInsertQuery = teamDetailsInsertQuery.concat(',(' + teamID + ')');
    return Promise.each(playerIDs, function (playerID) {
        playerTeamDetailsInsertQuery = playerTeamDetailsInsertQuery.concat(',', '(' + teamID + ',' + playerID + ',' + categoryID + ')');
        return playerTeamDetailsInsertQuery;
    });
}

function loadPlayerInterestDetails(group) {
    return knex.from('interest_details')
        .innerJoin('player_details', 'interest_details.player_id', 'player_details.player_id')
        .select('interest_details.player_id', 'group_id', 'game_id', 'category_id', 'gender')
        .where('group_id', group);
}

function categoryDetails() {
    return knex.raw('delete from player_team_details').then(() => {
        return Promise.all([
            knex.raw('delete from match_details'),
            knex.raw('ALTER SEQUENCE match_details_match_id_seq RESTART WITH 1'),
            knex.raw('delete from team_details')
        ]);
    }).then(() => {
        return knex.from('game_category_details')
            .select().then(function (n) {
                categoryInfo = n;
            });
    });
}

function insertIntoPlayerTeamDetails() {
    // Remove the extra ',' between "values" and "("
    teamDetailsInsertQuery = _.replace(teamDetailsInsertQuery, ',', '');
    playerTeamDetailsInsertQuery = _.replace(playerTeamDetailsInsertQuery, ',', '');
    return knex.raw(teamDetailsInsertQuery)
        .then(() => {
            return knex.raw(playerTeamDetailsInsertQuery);
        });
}

function fillMatchDetailsQuery() {
    return loadTeamDetailsData() // Fetch records from team_details table
        .then(function (teamDetails) {
            const categoryIDs = _.uniq(teamDetails.map(teamDetails => teamDetails.category_id));
            return _.map(categoryIDs, function (categoryID) {
                const categoryGroup = _.filter(teamDetails, ['category_id', categoryID]);
                const teams = _.uniq(categoryGroup.map(categoryGroup => categoryGroup.team_id));
                let index;
                for (index = 0; index < teams.length;) {
                    query1 = query1.concat(',(' + categoryID + ',' + teams[index++] + ',' + teams[index++], ')');
                }
            });
        });
}

function insertIntoMatchDetails() {
    query = query.concat(_.replace(query1, ',', ''));
    return knex.raw(query);
}

function loadTeamDetailsData() {
    return knex.select().from('player_team_details');
}
