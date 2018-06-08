var knex = require('./Postgres_player.js').knex;
var _ = require('lodash');
var Promise = require('bluebird')


function Match_Schedule() {
  Load_Data_From_Database()
// .then(function(player_details)
// {
//   return _.groupBy(player_details,'group_id')
// })
// .then(function(sorted_by_groups)
// {
   
// console.log(_.pick(sorted_by_groups, '1'));
//   //console.log(sorted_by_groups)
//   // console.log(_.groupBy(sorted_by_groups,'game_id'))
// })


// }
    .then(function (player_details) {
    //  console.log(player_details)
      knex('game_category_details')
        .select()
        .then(function (Category) {
            Promise.each(Category, function (Category_ID) {  // [{catID, gameID, catName}]
              Promise.map(['M', 'F'], function (Gender) { // ['M','F']
                return _.filter(player_details, // [{playerID, groupID, catID, gameID, gender}]
                  function (p) {
                    return ((p.category_id == Category_ID.category_id) 
                    && (p.gender == Gender))
                  })
              }).then(function(data){
                console.log(data, 'DATA');
              })
            })
        })
    })
}





//     .then(function(player_details) {
//       console.log(player_details)
//       knex('game_category_details')
//         .select()
//         .then(function (Category) {
//           //console.log("Category_ID", Category)
//           // _.forEach([1, 2,3,4], function (Game_ID) {
//             //console.log("@@@@@@@@@@@@@", Game_ID)
//             _.forEach(Category, function (Category_ID) {
//               _.forEach(['M', 'F'], function (Gender) {
//                 //console.log(Category_ID.category_id, Game_ID, Gender)
//                //console.log(player_details)
//               console.log(_.filter(player_details,
//                 function(p){
//                   //console.log("gid",Game_ID,Category_ID.category_id,Gender)
//                   //console.log(p.game_id, p.category_id, p.gender)
//                   return (
//                     // (p.game_id == Game_ID) &&
//                      (p.category_id==Category_ID.category_id) && (p.gender==Gender))
//                 })       )  
//                 // }, this);
//           // }, this);
//             });
//             });
//     })
// })
// }



//  .then(function(player_details)
//  {
//    knex('game_category_details')
//   .select()
//   .then(function(game_category){
//       console.log("1",game_category)
//       game_category.forEach(function(category_id) {
//       Make_Match(category_id.category_id, _.filter(player_details,function(player)
//    { console.log("--------",player)
//      return player.game_id == 1
//    }))
//   })
//       }, this)


// .then(function(cat_id){
//   console.log("----------------------", cat_id)
//  return _.filter(player_details,function(player)
//  {
//    return player.game_id == cat_id;
//  })
// })
//       .then(function(player_details)
//       {
// console.log(player_details)
// //       })
//      })
// }

Match_Schedule();

          function Make_Match(category_id, players) {
            console.log(category_id)
            console.log(players)

          }

          function Load_Data_From_Database() {
            return knex.from('interest_details')
              .innerJoin('player_details', 'interest_details.player_id', 'player_details.player_id')
              .select('interest_details.player_id', 'group_id', 'game_id', 'category_id', 'gender')
          }

