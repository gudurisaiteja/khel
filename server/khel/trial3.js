var knex = require('./Postgres_player.js').knex;
var _ = require('lodash');
var Promise = require('bluebird')

var Category_Info;
 Category_Details().then((a)=>{
   Category_Info = a;
    Match_Schedule();
 })

function Match_Schedule() {
    //console.log('cat info',Category_Info)
    knex('group_details')
        .select('group_id')
        .then(function (group_ids) {
            var groups = _.map(group_ids, 'group_id');
            Promise.map(groups, function (group) {
                return Load_Data_From_Database(group)
                    .then(function (group_members) {
                        return _.groupBy(group_members, 'category_id');
                    })
                    .then(function (sorted_by_categories) {
                        var categories = Object.values(sorted_by_categories)
                        return _.map(categories, function (category) {
                            return _.groupBy(category, 'gender')
                        })
                    })
                    .then(function (sorted_by_gender) {
                        _.each(sorted_by_gender, (gender_Categories) => {
                            _.each(gender_Categories, function (gender) {
                                Make_Matches(gender)
                            })
                        })
                    })
            })
        })
        
}

function Make_Matches(gender) {

    let player_count = gender.length;
    if (player_count > 1) {
        var index = 0;
var Category_ID =  gender[0].category_id;
var Category_Name = ((Category_Info.filter(function( ci ) {
  return ci.category_id == Category_ID;
})).map(a =>  a.category_name)).toString();
console.log("Name", Category_Name)

        var query = "insert into match_details values(";

    }
}

function Load_Data_From_Database(group) {
    return knex.from('interest_details')
        .innerJoin('player_details', 'interest_details.player_id', 'player_details.player_id')
        .select('interest_details.player_id', 'group_id', 'game_id', 'category_id', 'gender')
        .where('group_id', group)
}

function Category_Details() {
    return knex.from('game_category_details')
        .select().then(function(n)
        {
           Category_Info =  n;
           return Category_Info
        })
        
}