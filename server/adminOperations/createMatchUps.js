const dbconn = require('C:/Users/akhilesh.kura/express-mongoose-es6-rest-api/server/user/Dbconn.js');
var knexinst = dbconn.knexinst;
var bookshelf = require('bookshelf')(knexinst);
//var collections=require('collectionsjs');

let group_ids = []

knexinst('group_details')
    .select('group_id')
    .then((data) => {
        group_ids = data
        console.log(team_ids.length);
    
       
   });

var match_up=function(categoryid){
   var numberOfPlayers;
   knexinst('game_category_details')
   .select('no_of_players')
   .where({category_id:categoryid})
   .then((data)=>{
    numberOfPlayers=data;
    

   });

      
}






























// console.log('tids ',tids);


// function createMatches(Categoryid){
//     var teams=[]
//     let categoryName=''
//     if(Categoryid%10==1){ categoryName='interest_in_singles' }
//     else if(Categoryid%10==2){  categoryName='interest_in_doubles' }
//     else {  categoryName='interested_in_mixeddoubles' }
//     tids.forEach(id => {
//         knexinst.select('player_details.Player_ID','Team_ID','Game_ID','interest_in_singles','interest_in_doubles','interest_in_mixeddoubles')
//         .from('player_details')
//         .rightJoin('interest_details', 'player_details.Player_ID', 'interest_details.Player_ID')
//         .where({Team_ID:id, Game_ID:Gameid, categoryName : true })
//         .then(function(data){

//             //  teams.push(data);
//             console.log(data);



//         })

//     })
// };

