const dbconn = require('C:/Users/akhilesh.kura/express-mongoose-es6-rest-api/server/user/Dbconn.js');
var knexinst = dbconn.knexinst;
var bookshelf = require('bookshelf')(knexinst);
let _ = require('lodash');
let shuffle = require('shuffle-array');
//var collections=require('collectionsjs');


var match_up = function (categoryid) {
    // getAllGroupIds()
    // let groups = []
    let playersOrderedInGroup = []
    var number_of_players, game_id;


    return getCategoryDetails(categoryid)
        .then(function (data) {
            //numberOfPlayers = data;
            //Retriving no.of.players and game id for the given categoryid and retrieving groups
            console.log('data', data);

            number_of_players = data.no_of_players;
            game_id = data.game_id;
            console.log(game_id);
            return getAllGroupIds();
        })
        .map(function (group) {
            //retrieving  groups and scheduling
            let group_id = group.group_id;
            return getPlayerIntrestDetailsByGameIdAndGroupId(categoryid,group_id);
        })
        .then(function (data) {

            // console.log('playersOrderedInGroup originally:', playersOrderedInGroup);
            return _.map(data, function (playersList) {
                removePlayers(playersList, number_of_players);
                return playersList;
            });

        })
        .map(function(data){
           return shuffleArray(data);

        })
        .then(function (data) {
            console.log('playersOrderedInGroup after shuffle:', data);
            // for (var i = 0; i < playersOrderedInGroup.length; i++) {
            //         makeGroupMatchUps(playersOrderedInGroup[i], number_of_players)
            // }



        });
}

var makeGroupMatchUps = function (playersInGroupList, number_of_players) {
    let Matched = 1;
    for (var i = 0; i < playersInGroupList.length; i = i + j) {
        Matched = 0;
        let testVar = getMaxMatchId(playersInGroupList[0].category_id);
        console.log('testvar:', testVar);

        //  for(let j=0;j<number_of_players;j++)
        //  {


        //  }
        //  if(Matched==0)
        //  {

        //  }

    }
}
var getMaxMatchId = function (category_id) {
    return Promise.all([

        knexinst('match_details')
            .select('match_id')
            .max('match_id')
            .groupBy('category_id')
            .where('category_id', category_id)

    ])
        .then(function (data) {
            console.log('in getmaxid,,data', data);
            return data;
        })


}
let getCategoryDetails = function (categoryid) {
    return knexinst('game_category_details')
        .select('no_of_players', 'game_id')
        .where({ category_id: categoryid })
        .then(function (data) {
            //numberOfPlayers = data;
            //Retriving no.of.players and game id for the given categoryid and retrieving groups
            console.log('data', data);
            return data[0];
            // number_of_players = data[0].no_of_players;
            // game_id = data[0].game_id;
        });
}

var getAllGroupIds = function () {

    return knexinst('group_details')
        .select('group_id');
};

var removePlayers = function (playersList, no_of_players) {

    var toRemove
    if (playersList.length > (no_of_players * 4)) {
        toRemove = (playersList.length % (no_of_players * 4));
        // console.log('removeplayer, toremove', toRemove, no_of_players, playersList.length);


        for (let i = 0; i < toRemove; i++) {
            playersList.pop();
        }
    }
    else {
        toRemove = (playersList.length % (no_of_players * 2));
        // console.log('removeplayer, toremove', toRemove, no_of_players, playersList.length);


        for (let i = 0; i < toRemove; i++) {
            playersList.pop();
        }

    }


}
/**
 * 
 * @param {*} group_id 
 * @param {*} game_id 
 */
let getPlayerIntrestDetailsByGameIdAndGroupId = function (category_id, group_id) {

    return knexinst.select('player_details.player_id', 'group_id', 'game_id', 'interest_details.category_id')
        .from('player_details')
        .innerJoin('interest_details', 'player_details.player_id', 'interest_details.player_id')
        .where({ category_id: category_id, group_id: group_id })
        .then(function (data) {
            return data;
        });
}

/**
 * 
 * @param {*} array 
 */
let shuffleArray = function (array) {
    console.log('shuffle');
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
