var knex = require('./Postgres_player.js').knex;
var _ = require('lodash');

function Match_Schedule()
{
     Load_Data_From_Database()
     .then(function(player_details)
     {
       //console.log(player_details)
       //console.log(player_details.length)
      // var eg =  _.pull(player_details,{game_id:1})
      //  console.log(eg)
      //  console.log("-----------------------------------")

//  var game_ids = _.uniq(_.map(player_details, 'game_id'));
//       console.log(_.uniq(_.map(player_details, 'game_id')));
      
      // .then((id)=>console.log(id));

      knex('game_category_details')
    .select()
    .then(function(data){
console.log(data)
    }); 
         var player_array = [];
       player_details.filter(function(player)
       {
         if(player.game_id == 1)
         {
           player_array.push(player)
         }
       })
       console.log(player_array)
     })
}

Match_Schedule();

function Load_Data_From_Database()
{
    return knex('interest_details')
    .select();      
}

