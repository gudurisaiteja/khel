
// exports.up = function (knex, Promise) {
//     return knex.schema.createTable('matchlevel_team_member_details', function (t) {
//         t.integer('Match_Team_ID').unsigned().primary();
//         t.integer('Player_ID').references('player_details.Player_ID');
//         t.binary('Category_ID').references('game_category_details.Category_ID');
//         t.binary('Win/Lose').notNull();
//     })
// }
//     .then(function (knex, Promise) {
//         return knex.schema.createTable('matchlevel_player_details', function (t) {
//             t.integer('Match_ID').references('match_details.Match_ID');
//             t.integer('Match_Team_ID').references('matchlevel_team_member_details.Match_Team_ID');
//         })
//     })
//     .then(function (knex, Promise) {
//         return knex.schema.createTable('match_details', function (t) {
//             t.integer('Match_ID').unsigned().primary();
//             t.integer('Category_ID').references('game_category_details.Category_ID');
//             t.date('Date').notNull();
//             t.time('Time').notNull();
//         })
//     })
//     .then(function (knex, Promise) {
//         return knex.schema.createTable('game_category_details', function (t) {
//             t.integer('Category_ID').unsigned().primary();
//             t.integer('Game_ID').references('game_details.Game_ID');
//             t.string('Category_Name',50).notNull();
//         })
//     })
//     .then(function(knex, Promise) {
//     return knex.schema.createTable('player_details', function(t) {
//         t.integer('Player_ID').unsigned().primary();
//         t.string('Name',50).notNull();
//         t.string('Email',50).notNull();
//         t.string('Mobile').notNull();
//         t.string('EncryptedPassword').notNull();
//         t.string('Team_ID').references('team_details.Team_ID');
//         t.string('Gender', 10).notNull();
//         t.string('Role').notNull();
//     })
//        })
//     .then(function(knex, Promise){
//         knex.schema.createTable('Interest_Details', function(t) {
//             t.integer('Player_ID').unsigned().notNull();
//             t.integer('Game_ID').references('game_details.Game_ID');
//             t.binary('Interest_in_Singles').notNull();
//             t.binary('Interest_in_Doubles').notNull();    
//             t.binary('Interest_in_MixedDoubles').notNull();            
//         })
//     })
//     .then(function(knex, Promise){
//         console.log(t);
//         knex.schema.createTable('Gallery', function(t) {
//             t.integer('Photo').unsigned().primary();// change type to blob
//             t.string('Team_ID').references('team_details.Team_ID');  
//         })
//     })
//     .then(function(knex, Promise){
//         knex.schema.createTable('game_details', function(t) {
//             t.integer('Game_ID').unsigned().primary();
//             t.string('Name').notNull();  
//         })
//     })
//     .then(function(knex, Promise){
//         knex.schema.createTable('team_details', function(t) {
//             t.integer('Team_ID').unsigned().primary();
//             t.string('Name').notNull();
//             t.string('Logo').notNull();//change type to blob  
//         })
//     });


// exports.down = function (knex, Promise) {
//     return knex.schema.dropTable('matchlevel_team_member_details');
// }
// .then(function(knex,promise){
//     return knex.schema.dropTable('matchlevel_player_detail');
// })
// .then(function(knex,promise){
//     return knex.schema.dropTable('match_details');
// })
// .then(function(knex,promise){
//     return knex.schema.dropTable('game_category_details');
// })
// .then(function(knex,promise){
//     return knex.schema.dropTable('player_details');
// })
// .then(function(knex,promise){
//     return knex.schema.dropTable('Interest_Details');
// })
// .then(function(knex,promise){
//     return knex.schema.dropTable('Gallery');
// })
// .then(function(knex,promise){
//     return knex.schema.dropTable('game_details');
// })
// .then(function(knex,promise){
//     return knex.schema.dropTable('team_details');
// });
