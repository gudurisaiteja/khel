var knex = require('./Postgres_player.js').knex;
var _ = require('lodash');
var Promise = require('bluebird')

var Category_Info;
var Team_Id = 0;
var player_team_details_insert_query = "insert into player_team_details values";
var team_details_insert_query = "insert into team_details values"
Category_Details().then(() => { // returns game categories from game_category_details table)
    Categorize();
})

function Categorize() { // Groups players with common interests together
    //console.log('cat info',Category_Info)
    console.log("2")
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
  // change to promise.each
  //put return statements to all promises and functions
                        _.each(sorted_by_gender, (gender_Categories) => {
                            _.each(gender_Categories, function (players) {                               
                                Make_Matches(players)
                            })

                        })
                        console.log('ujwala');
                    })
            })
        })
}
/**
 * 
 * @param {*} players 
 */
function Make_Matches(players) {
    console.log("'''''''''''''''''''''''''''''''''''''''''''''''")
    console.log(players)

    let index = 0;
    let player_count = players.length;
    let Category_ID = players[0].category_id;
    let Team_Capacity = (_.pick((_.find(Category_Info, { category_id: Category_ID })), 'no_of_players'))['no_of_players']
   console.log("team Capacity", Team_Capacity)
   if(player_count < 2*Team_Capacity)
   {
       return 0;
   }
    let No_Of_Initial_Matches = player_count / (2 * Team_Capacity)
    console.log("QQQQQQQQQQQQ",No_Of_Initial_Matches)
    let Chunks_Of_Teams = _.chunk(players, Team_Capacity)
    console.log(Chunks_Of_Teams)
    Promise.each(Chunks_Of_Teams, function (team) {
        console.log("1111111")
        console.log("AAAAAAAAA",team)
        return Fill_Team_Details(team, Team_Capacity)
    })
        .then(function (a) {
            team_details_insert_query = _.replace(team_details_insert_query, ',', '')
            //console.log(team_details_insert_query)
            return knex.raw(team_details_insert_query)
        })
        .then(function () {
            player_team_details_insert_query = _.replace(player_team_details_insert_query, ',', '')
            //console.log(player_team_details_insert_query)
            return knex.raw(player_team_details_insert_query)
        })
    var query = "insert into match_details values(";
 
}

function Load_Data_From_Database(group) {
    return knex.from('interest_details')
        .innerJoin('player_details', 'interest_details.player_id', 'player_details.player_id')
        .select('interest_details.player_id', 'group_id', 'game_id', 'category_id', 'gender')
        .where('group_id', group)
}

function Category_Details() {
    //console.log("1")
    return knex.from('game_category_details')
        .select().then(function (n) {
            Category_Info = n;
            //return Category_Info
        })

}

function Fill_Team_Details(team_players, Team_Capacity) {
    console.log("4",Team_Capacity)
    //    console.log(team_players+"      "+Team_Capacity)     
    if (team_players.length != Team_Capacity) {
        return 0;
    }
    Team_Id++;
    //console.log("team", Team_Id)
    var player_ids = team_players.map(a => a.player_id)
   // console.log("player",player_ids)
    team_details_insert_query = team_details_insert_query.concat(",(" + Team_Id + ")");
    return Promise.each(player_ids, function (Player_ID) {
     //   console.log(player_ids, "              ", Player_ID)
    //    console.log("4.1")
    return player_team_details_insert_query = player_team_details_insert_query.concat(",", "(" + Team_Id + "," + Player_ID + ")");
   
 })

}
