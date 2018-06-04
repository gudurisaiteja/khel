exports.up = function (knex, Promise) {
    return Promise.all([
          knex.schema.createTable('team_details', function(t) {
            t.integer('team_id').unsigned().primary();
            t.string('name',50).notNull();
            t.string('logo').notNull();//change type to blob  
        }),
           knex.schema.createTable('player_details', function(t) {
        t.increments('player_id').unsigned().primary();
        // t.string('name',50).notNull();
        // t.string('email',50).notNull();
        // t.integer('mobile').notNull();
        // t.string('encryptedpassword',50).notNull();
        // t.integer('team_id').references('team_details.team_id');
        // t.string('gender', 10).notNull();
        // t.string('role').notNull();
           t.string('name',50).notNull();
        t.string('email',50);
        t.integer('mobile');
        t.string('encryptedpassword',50);
        t.integer('team_id').references('team_details.team_id');
        t.string('gender', 10);
        t.string('role');
    }),
      knex.schema.createTable('game_details', function(t) {
            t.integer('game_id').unsigned().primary();
            t.string('name',50).notNull();  
        }),
     knex.schema.createTable('game_category_details', function (t) {
            t.integer('category_id').unsigned().primary();
            t.integer('game_id').references('game_details.game_id');
            t.string('category_name',50).notNull();
        }),
    // knex.schema.createTable('matchlevel_team_member_details', function (t) {
    //     t.integer('match_team_id').unsigned().primary();
    //     t.integer('player_id').references('player_details.player_id');
    //     t.integer('category_id').references('game_category_details.category_id');
    //     t.boolean('win/lose').notNull();
    // }),
     knex.schema.createTable('match_details', function (t) {
            t.increments('match_id').unsigned().primary();
            t.integer('category_id').references('game_category_details.category_id')
            t.integer('team1_id').references('team_details.team_id');
            t.integer('team2_id').references('team_details.team_id');            
            t.date('date');
            t.time('time');
        }),

        knex.schema.createTable('results', function (t) {
            t.integer('result_id').unsigned().primary();
            t.integer('match_id').references('match_details.match_id')
            t.integer('winner').references('team_details.team_id');
        }),
//     knex.schema.createTable('matchlevel_player_details', function (t) {
//     t.integer('match_id').references('match_details.match_id');
//     t.integer('match_team_id').references('matchlevel_team_member_details.match_team_id');
//  }),
   
  
     knex.schema.createTable('interest_details', function(t) {
            t.integer('player_id').references('player_details.player_id');
            t.integer('game_id').references('game_details.game_id');
            t.boolean('interested_in_singles').notNull();
            t.boolean('interested_in_doubles').notNull();    
            t.boolean('interested_in_mixeddoubles').notNull();            
        }),
         knex.schema.createTable('gallery', function(t) {
            t.string('photo').unsigned().primary();// change type to blob
            t.integer('team_id').references('team_details.team_id');  
        }),
    ]);
};


exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('gallery'),
        knex.schema.dropTable('interest_details'),
        // knex.schema.dropTable('matchlevel_player_details'),
        knex.schema.dropTable('results'),                
        knex.schema.dropTable('match_details'),
        // knex.schema.dropTable('matchlevel_team_member_details'),
        knex.schema.dropTable('game_category_details'),
        knex.schema.dropTable('game_details'),
        knex.schema.dropTable('player_details'),
        knex.schema.dropTable('team_details')      
    ]);
};
