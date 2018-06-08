var knex = require('./Postgres_player.js').knex;
var _ = require('lodash');
var Promise = require('bluebird')

function Match_Schedule() {
    Load_Data_From_Database()
        .then(function (player_details) {
            console.log(player_details)
        })
        //     return _.groupBy(player_details, 'group_id')
        // })
        // .then(function (sorted_by_groups) {
        //    Promise.each(Category(_.pick(sorted_by_groups, '1'));
        // })
}

Match_Schedule();

function Category()
{

}
function Load_Data_From_Database() {
    return knex.from('interest_details')
        .innerJoin('player_details', 'interest_details.player_id', 'player_details.player_id')
        .select('interest_details.player_id', 'group_id', 'game_id', 'category_id', 'gender')
}

