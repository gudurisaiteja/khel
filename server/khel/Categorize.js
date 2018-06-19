const knex = require('./Postgres_player.js').knex;
const _ = require('lodash');
const Promise = require('bluebird')

function Categorize() { // Groups players with common interests together
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
  console.log('sssss',sorted_by_gender)
                        var gender_Categories = Object.values(sorted_by_gender)
                        console.log(gender_Categories)
                        return _.map(gender_Categories, function(players)
                        {
                           // console.log(Object.values(gender))
                             return Make_Matches(Object.values(players))
                        } )
                        // return _.each(sorted_by_gender, (gender_Categories) => {
                        // //  console.log("gender_Categories",gender_Categories)
                        //     return _.each(gender_Categories, function (players) {        
                        //         //  console.log("!")                                                     
                        //         return Make_Matches(players)
                           // })

                        //})
                    })
            })
        })
}

function Load_Data_From_Database(group) {
    return knex.from('interest_details')
        .innerJoin('player_details', 'interest_details.player_id', 'player_details.player_id')
        .select('interest_details.player_id', 'group_id', 'game_id', 'category_id', 'gender')
        .where('group_id', group)
}

module.exports = {Categorize}