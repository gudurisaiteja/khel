var knex = require('./Postgres_player.js').knex;
var _ = require('lodash');

function Match_Schedule()
{
     
}

Match_Schedule();

function Load_Data_From_Database()
{
    knex('interest_details')
    .select('player_id')
      .then((data)=>{
        // var c = data1.length;
        // console.log("c", c);
        console.log(data)
      })

// knex.select('game_id').from('game_details')
//   .then((game_id)=>{
//       let game_ids = _.map(game_id, 'game_id');
//       knex('interest_details')
//     .select()
//     .whereIn('game_id', game_ids)
//       .then((data1)=>{
//         // var c = data1.length;
//         // console.log("c", c);
//       })
//     })
}