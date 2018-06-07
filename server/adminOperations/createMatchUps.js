const dbconn = require('C:/Users/akhilesh.kura/express-mongoose-es6-rest-api/server/user/Dbconn.js');
var knexinst = dbconn.knexinst;
var bookshelf = require('bookshelf')(knexinst);
let lodash = require('lodash');
let shuffle = require('shuffle-array');
//var collections=require('collectionsjs');


var match_up = function (categoryid) {
    // getAllGroupIds()
    var groups = []
    let playersOrderedInGroup = []
    var number_of_players, game_id;



    knexinst('game_category_details')
        .select('no_of_players', 'game_id')
        .where({ category_id: categoryid })
        .then(function (data) {
            //numberOfPlayers = data;
            //Retriving no.of.players and game id for the given categoryid and retrieving groups
            console.log('data', data);

            number_of_players = data[0].no_of_players;
            game_id = data[0].game_id;
            console.log(game_id);
            return getAllGroupIds();
        })
        .then(function (groupids) {
            //retrieving  groups and scheduling
            groups = lodash.map(groupids, 'group_id');
            console.log('groups', groups);

            return Promise.all(groups.map(function (id) {
                return knexinst.select('player_details.player_id', 'group_id', 'game_id', 'interest_details.category_id')
                    .from('player_details')
                    .rightJoin('interest_details', 'player_details.player_id', 'interest_details.player_id')
                    .where({ group_id: id, game_id: game_id })
                    .then(function (data) {
                        if (data.length > 1) { playersOrderedInGroup.push(data); }

                    })
            }));
        })
        .then(function (data) {

            console.log('playersOrderedInGroup originally:', playersOrderedInGroup);
            return Promise.all(playersOrderedInGroup.map(function(arr){shufflearray(arr)}));
            
        })
        .then(function (data) {

            console.log('playersOrderedInGroup after shuffle:', playersOrderedInGroup);

        });
    }
    var getAllGroupIds = function () {

        return knexinst('group_details')
            .select('group_id');
    };


    let shufflearray = function (array) {
    //    console.log('shuffle');
       
        return shuffle(array);
    };

    match_up(11);




















/*

.then(()=>{
        
    })  
*/






// console.log('tids ',tids);


// function createMatches(Categoryid){
//     var teams=[]
//     let categoryName=''
//     if(Categoryid%10==1){ categoryName='interest_in_singles' }
//     else if(Categoryid%10==2){  categoryName='interest_in_doubles' }
//     else {  categoryName='interested_in_mixeddoubles' }
//     tids.forEach(id => {
//         knexinst.select('player_details.player_id','Team_ID','Game_ID','interest_in_singles','interest_in_doubles','interest_in_mixeddoubles')
//         .from('player_details')
//         .rightJoin('interest_details', 'player_details.player_id', 'interest_details.player_id')
//         .where({Team_ID:id, Game_ID:Gameid, categoryName : true })
//         .then(function(data){

//             //  teams.push(data);
//             console.log(data);



//         })

//     })
