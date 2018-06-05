// exports.seed = function(knex, Promise) {
//     // Deletes ALL existing entries
//     return Promise.all([


//         knex('game_category_details').del()
//         .insert([
//             {category_id: 11, game_id: 1, category_name:'Singles', no_of_players:1},
//             {category_id: 12, game_id: 1, category_name:'Doubles', no_of_players:2},

//             {category_id: 21, game_id: 2, category_name:'Singles', no_of_players:1},
//             {category_id: 22, game_id: 2, category_name:'Doubles', no_of_players:2},

//             {category_id: 31, game_id: 3, category_name:'Singles', no_of_players:1}
//           ]),

//           knex('game_details').del()
//           .insert([
//             { game_id: 1, name:'TT'},
//             { game_id: 2, name:'Badminton'},
//             { game_id: 3, name:'Chess'}
//         ])




//     ]);
//     }
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('game_details').del()
      .then(()=>{  knex('game_details').del() })
      .then(()=>{  game_details(knex); })
      .then(()=>{  game_category_details(knex); });
  };

var game_details = function (knex) {

    knex('game_details').del()
        .insert([
            { game_id: 1, name: 'TT' },
            { game_id: 2, name: 'Badminton' },
            { game_id: 3, name: 'Chess' }
        ]);

}
var game_category_details = function (knex) {

    knex('game_category_details').del()
        .insert([
            { category_id: 11, game_id: 1, category_name: 'Singles', no_of_players: 1 },
            { category_id: 12, game_id: 1, category_name: 'Doubles', no_of_players: 2 },

            { category_id: 21, game_id: 2, category_name: 'Singles', no_of_players: 1 },
            { category_id: 22, game_id: 2, category_name: 'Doubles', no_of_players: 2 },

            { category_id: 31, game_id: 3, category_name: 'Singles', no_of_players: 1 }
        ]);

}

// exports.seed = function (knex, Promise) {
//    return Promise.all([
//        game_details(knex),
//        game_category_details(knex)
//    ])
// }










