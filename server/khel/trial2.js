var knex = require('./Postgres_player.js').knex;
var _ = require('lodash');
var Promise = require('bluebird')


function Match_Schedule() {
    Load_Data_From_Database()
        .then(function (player_details) {
           // console.log(player_details)3            return _.groupBy(player_details, 'group_id');
        })
        .then(function (sorted_by_groups) {
            let groups = Object.values(sorted_by_groups);
            return _.map(groups, function (group) {
                return _.groupBy(group, 'category_id');
            })
        })
        .then(function (sorted_by_categories) {
             //console.log(sorted_by_categories)
            
            var categories = Object.values(sorted_by_categories)
            return _.map(categories, function (category) {
                return _.groupBy(category, 'gender')
            })
        })
        .then(function (sorted_by_gender) {
            console.log("1")
            console.log(sorted_by_gender)
            var gender = Object.values(sorted_by_gender)
            console.log(Object.keys(sorted_by_gender))
            console.log(gender)
        })
}


Match_Schedule();

function Make_Match(category_id, players) {
    console.log(category_id)
    console.log(players)

}

function Load_Data_From_Database() {
    // var subquery = knex('player_details').select('player_id', 'group_id', 'gender').groupBy('group_id');
    //  return knex.from('interest_details')
    //     .innerJoin(subquery, 'interest_details.player_id', subquery.player_id)
    //     .select('interest_details.player_id', 'group_id', 'game_id', 'category_id', 'gender');
    // return knex.from('interest_details')
    //     .innerJoin(subquery, 'interest_details.player_id', subquery.player_id)
    //     .select('interest_details.player_id', 'group_id', 'game_id', 'category_id', 'gender')
    //     Select EmployeeID,EmployeeFirstName,EmployeeLastName,TotalSales
    // from Employee  
    // inner join 
    //  (Select SalesEmployeeID,sum(SalesTotal) as TotalSales
    //     from  Sales group by SalesEmployeeID) empSales 
    // on empSales.SalesEmployeeID= EmployeeID
    return knex.from('interest_details')
        .innerJoin('player_details', 'interest_details.player_id', 'player_details.player_id')
        .select('interest_details.player_id', 'group_id', 'game_id', 'category_id', 'gender')
    // var subquery = knex('group_details').select('group_id')
    // return knex.from('interest_details')
    //         .innerJoin('player_details', 'interest_details.player_id', 'player_details.player_id')
    //         .select('interest_details.player_id', 'group_id', 'game_id', 'category_id', 'gender')
    //         .where('group_id', 'in', subquery)
    //         SELECT C1.*, p1.*
    //   FROM Customer C1
    //   JOIN Orders O1 ON O1.Customer_Id = C1.Id
    //   JOIN Product P1 ON P1.Id = O1.Product_Id
    //  WHERE C1.Id IN (SELECT c.Id
    //                    FROM Customer c
    //                    JOIN Orders o ON o.Customer_Id = c.Id
    //                   GROUP BY (c.Id)
    //                  HAVING COUNT(DISTINCT o.Product_Id) >= 2)
        
}

