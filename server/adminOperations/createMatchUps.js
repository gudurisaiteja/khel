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
            return getPlayerInterestDetailsByGameIdAndGroupId(categoryid, group_id);
        })
        .then(function (data) {

            // console.log('playersOrderedInGroup originally:', playersOrderedInGroup);
            return _.map(data, function (playersList) {
                removePlayers(playersList, number_of_players);
                return playersList;
            });


        })
        .map(function (data) {
            return shuffleArray(data);

        })

        .then(function (data) {
            console.log('playersOrderedInGroup after shuffle:', data);
            playersOrderedInGroup = data;

            // for (var i = 0; i < playersOrderedInGroup.length; i++) {
                playersOrderedInGroup.map(function name(playersInGroup) {
                    if (playersInGroup.length > number_of_players) {
                        makeGroupMatchUps(playersInGroup, number_of_players)
                            .then(function (data) {
                                console.log('');
        
        
                            })
                    }
                    else{
        
                        /* against groups logic */
                    }
                })
           
            //}



        });
}

var makeGroupMatchUps = function (playersInGroup, number_of_players) {
    let Matched = 1;
    let currentMatchId;
    let team_id;
    return getMaxMatchId(playersInGroup[0].category_id)
        .then(function (max_id) {
            currentMatchId = max_id + 1;
            return getMaxTeamId();

        })
        .then(function(max_team_id){
            current_team_id=max_team_id+1;
            Matched=0;
            let team_id1=0,team_id2=0;

            Promise.map(_.chunk(playersInGroup,number_of_players*2),function(data){
                            _.chunk(data,no_of_players,function(teams){
                              teams[0].map(insertIntoTeamDetails({team_id:current_team_id, player_id: playersInGroup[j].player_id }))
                            })

            })

            for(let i = 0; i < playersInGroup.length; i = i + number_of_players) {
             
                for (let j = i; j < i + number_of_players; j++) {
                     
                     insertIntoTeamDetails({team_id:current_team_id, player_id: playersInGroup[j].player_id });
                     if(team_id1==0){ team_id1=current_team_id; }
                     else if (team_id2==0){ team_id2=current_team_id; }

                }
               if(Matched==0){ current_team_id=current_team_id+1 }
               else{
                insertIntoMatchDetails(currentMatchId,playersInGroup[i].category_id,team_id1,team_id2,Date.now(),'NA',getMaxStage(category_id)+1);
                Matched=1;
               }
              
              
               
            }
        });

}
let getMaxStage=function(category_id){

 return knexinst('match_details')
 .max('stage')
 .where('category_id',category_id);
}
let insertIntoMatchDetails=function(details){
    knexinst('match_details').insert(details);

}

let insertIntoTeamDetails=function(teamDetails){

    knexinst('team_details')
    .insert(teamDetails);

}
let getMaxMatchId = function (category_id) {


    return knexinst('match_details')
        .max('match_id')
        .groupBy('category_id')
        .where('category_id', category_id)


    // .then(function (data) {
    //     console.log('in getmaxid,,data', data);
    //     return data;
    // })


}
let getMaxTeamId = function () {


    return knexinst('team_details')
        .max('team_id')
   


}
let getCategoryDetails = function (categoryid) {
    return knexinst('game_category_details')
        .select('no_of_players', 'game_id')
        .where({ category_id: categoryid })
        .then(function (data) {
            //numberOfPlayers = data;
            //Retrieving no.of.players and game id for the given categoryid and retrieving groups
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
    }
    else {
        toRemove = (playersList.length % (no_of_players * 2));
        // console.log('removeplayer, toremove', toRemove, no_of_players, playersList.length);

    }
    for (let i = 0; i < toRemove; i++) {
        playersList.pop();
    }


}
/**
 * 
 * @param {*} group_id 
 * @param {*} game_id 
 */

let getPlayerInterestDetailsByGameIdAndGroupId = function (category_id, group_id) {

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
Worked on Schedule Algorithm 
   -fetched the required dat aaccording to groups


*/

















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
