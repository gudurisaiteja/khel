const knex = require('./Postgres_player.js').knex;
const _ = require('lodash');
const Promise = require('bluebird')

var Category_Info;
var Team_Id = 0;
var player_team_details_insert_query = "insert into player_team_details values";
var team_details_insert_query = "insert into team_details values";
var query = "insert into match_details(category_id,team1_id,team2_id) values";
var query1 = " ";

Category_Details()
    .then(function () { // returns game categories from game_category_details table)
        return Categorize();
    })
    .then(function () {
        return Insert_Player_Team_Details();
    })
    .then(function () {
        return Fill_Match_Details();
    })
    .then(function () {
        return Insert_Match_Details();
    })

function Categorize() { // Groups players with common interests together
    return knex('group_details')  // Select unique group ids
        .select('group_id')
        .then(function (group_ids) {
            let groups = _.map(group_ids, 'group_id');
            return Promise.map(groups, function (group) { // Get player details, one group at a time
                return Load_Data_From_Database(group)
                    .then(function (group_members) {
                        return _.groupBy(group_members, 'category_id');
                    })
                    .then(function (sorted_by_categories) { // categorize according to group, category
                        var categories = Object.values(sorted_by_categories)
                        return _.map(categories, function (category) {
                            return _.groupBy(category, 'gender')
                        })
                    })
                    .then(function (sorted_by_gender) { //categorize according to group, category, gender                
                        let players = _.map(sorted_by_gender, (gender_Categories) => {
                            return _.map(gender_Categories, function (players) {
                                return players;
                            })
                        });
                        return Promise.each(players, function (plrs) {
                            return Promise.each(plrs, function (plr) {
                                return Make_Matches(plr);
                            })
                        });
                    })
            })
        })
}


/**
 * 
 * @param {*} players 
 */
function Make_Matches(players) {
    let index = 0;
    let player_count = players.length;
    let Category_ID = players[0].category_id;
    let Team_Capacity = (_.pick((_.find(Category_Info, { category_id: Category_ID })), 'no_of_players'))['no_of_players']
    if (player_count < 2 * Team_Capacity) {
        return 0;
    }
    let extra_Players = player_count % (2 * Team_Capacity)
    if (extra_Players != 0) {
        players.splice(players.length - extra_Players);
    }
    let Chunks_Of_Teams = _.chunk(players, Team_Capacity)
    return Promise.each(Chunks_Of_Teams, function (team) {
        return Fill_Team_Details(team, Team_Capacity, Category_ID)
    })

}

function Fill_Team_Details(team_players, Team_Capacity, Category_ID) {
    if (team_players.length != Team_Capacity) {
        return 0;
    }
    Team_Id++;
    let player_ids = team_players.map(a => a.player_id)
    team_details_insert_query = team_details_insert_query.concat(",(" + Team_Id + ")");
    return Promise.each(player_ids, function (Player_ID) {
        return player_team_details_insert_query = player_team_details_insert_query.concat(",", "(" + Team_Id + "," + Player_ID + "," + Category_ID + ")");
    })

}

function Load_Data_From_Database(group) {
    return knex.from('interest_details')
        .innerJoin('player_details', 'interest_details.player_id', 'player_details.player_id')
        .select('interest_details.player_id', 'group_id', 'game_id', 'category_id', 'gender')
        .where('group_id', group)
}

function Category_Details() {
    return knex.raw("delete from player_team_details").then(() => {
        return Promise.all([
            knex.raw("delete from match_details"),
            knex.raw("ALTER SEQUENCE match_details_match_id_seq RESTART WITH 1"),
            knex.raw("delete from team_details")
        ])
    }).then(() => {
        return knex.from('game_category_details')
            .select().then(function (n) {
                Category_Info = n;
            })
    })
}

function Insert_Player_Team_Details() {
    team_details_insert_query = _.replace(team_details_insert_query, ',', '')
    player_team_details_insert_query = _.replace(player_team_details_insert_query, ',', '')
    return knex.raw(team_details_insert_query)
        .then(() => {
            return knex.raw(player_team_details_insert_query)
        })
}

function Fill_Match_Details() {
    return Load_Team_Details_Data()
        .then(function (data) {
            let matches = _.uniq(data.map(data => data.category_id))
            return _.map(matches, function (match) {
                var filter = _.filter(data, ['category_id', match])
                var teams = _.uniq(filter.map(filter => filter.team_id))            
            for(index=0;index<teams.length;)
            {
                query1 = query1.concat(",(" + match + "," + teams[index++] + "," + teams[index++], ")");
            }
            })
        })
}

function Insert_Match_Details() {
    query = query.concat(_.replace(query1, ',', ''))
    return knex.raw(query)
}

function Load_Team_Details_Data() {
    return knex.select().from('player_team_details')

}