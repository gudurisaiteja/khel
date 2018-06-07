exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    // return Promise.all([

    //     knex('game_details')
    //     .insert([
    //       { game_id: 1, name:'TT'},
    //       { game_id: 2, name:'Badminton'},
    //       { game_id: 3, name:'Chess'}
    //   ]),
    //     knex('game_category_details')
    //     .insert([
    //         {category_id: 11, game_id: 1, category_name:'Singles', no_of_players:1},
    //         {category_id: 12, game_id: 1, category_name:'Doubles', no_of_players:2},

    //         {category_id: 21, game_id: 2, category_name:'Singles', no_of_players:1},
    //         {category_id: 22, game_id: 2, category_name:'Doubles', no_of_players:2},

    //         {category_id: 31, game_id: 3, category_name:'Singles', no_of_players:1}
    //       ])

    //     ])


    return knex('game_details').del()
        .insert([
            { game_id: 1, name: 'TT' },
            { game_id: 2, name: 'Badminton' },
            { game_id: 3, name: 'Chess' }
        ]).then(function (data) {
            console.log('then');

            return knex('game_category_details').del()
                .insert([
                    { category_id: 11, game_id: 1, category_name: 'Singles', no_of_players: 1 },
                    { category_id: 12, game_id: 1, category_name: 'Doubles', no_of_players: 2 },

                    { category_id: 21, game_id: 2, category_name: 'Singles', no_of_players: 1 },
                    { category_id: 22, game_id: 2, category_name: 'Doubles', no_of_players: 2 },

                    { category_id: 31, game_id: 3, category_name: 'Singles', no_of_players: 1 }
                ])
                .then(() => {
                    console.log('then 2');

                })

        })



}






// var game_details = function (knex) {
// console.log("2")
//     return knex('game_details')
//         .insert([
//             { game_id: 1, name: 'TT' },
//             { game_id: 2, name: 'Badminton' },
//             { game_id: 3, name: 'Chess' }
//         ]);
//         console.log('gd');

// }
// var game_category_details = function (knex) {

//     return knex('game_category_details')
//         .insert([
//             { category_id: 11, game_id: 1, category_name: 'Singles', no_of_players: 1 },
//             { category_id: 12, game_id: 1, category_name: 'Doubles', no_of_players: 2 },
//             { category_id: 21, game_id: 2, category_name: 'Singles', no_of_players: 1 },
//             { category_id: 22, game_id: 2, category_name: 'Doubles', no_of_players: 2 },
//             { category_id: 31, game_id: 3, category_name: 'Singles', no_of_players: 1 }
//         ]);
//         console.log('gct');


// }
// // exports.seed = function(knex, Promise) {
// //     // Deletes ALL existing entries
// //     return knex('game_details').del()
// //       .then((data)=>{  knex('game_details').del() })
// //       .then((data)=>{  game_details(knex); })
// //       .then((data)=>{  game_category_details(knex); });
// //   };

// exports.seed = function (knex, Promise) {
//        game_details(knex)
//        .then((data)=>{
//    console.log("1")

//         game_category_details(knex)
//        })


// }










