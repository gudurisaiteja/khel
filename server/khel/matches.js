var knex = require('./Postgres_player.js').knex;
var _ = require('lodash');
var Promise = require('bluebird')


function Match_Schedule() {
  Load_Data_From_Database()
    .then(function (player_details) {
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
            }).then(function (data) {
              console.log(data, 'DATA');
            })
          })
        })
    })
}

Match_Schedule();

function Make_Match(category_id, players) {
}

function Load_Data_From_Database() {
  return knex.from('interest_details')
    .innerJoin('player_details', 'interest_details.player_id', 'player_details.player_id')
    .select('interest_details.player_id', 'group_id', 'game_id', 'category_id', 'gender')
}

