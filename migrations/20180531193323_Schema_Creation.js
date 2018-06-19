exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('group_details', function (t) {
            t.integer('group_id').unsigned().primary();
            t.string('name', 50).notNull();
            t.string('logo').notNull();
        }),
        knex.schema.createTable('game_details', function (t) {
            t.integer('game_id').unsigned().primary();
            t.string('name', 50).notNull();
        }),
        knex.schema.createTable('player_details', function (t) {
            t.integer('player_id').unsigned().primary();
            t.string('name', 50).notNull();
            t.string('email', 50).notNull();
            t.string('mobile', 13).notNull();
            t.string('encryptedpassword', 50).notNull();
            t.integer('group_id').references('group_details.group_id');
            t.string('gender', 10).notNull();
            t.string('role').notNull();
        }),
        knex.schema.createTable('team_details', function (t) {
            t.integer('team_id').unsigned().primary();
        }),
        knex.schema.createTable('game_category_details', function (t) {
            t.integer('category_id').unsigned().primary();
            t.integer('game_id').references('game_details.game_id');
            t.string('category_name', 50).notNull();
            t.integer('no_of_players').notNull();
        }),
        knex.schema.createTable('player_team_details', function (t) {
            t.integer('team_id').unsigned().references('team_details.team_id');
            t.integer('player_id').references('player_details.player_id');
            t.integer('category_id').unsigned().references('game_category_details.category_id')
        }),
        knex.schema.createTable('match_details', function (t) {
            t.increments('match_id').unsigned().primary();
            t.integer('category_id').references('game_category_details.category_id');
            t.integer('team1_id').references('team_details.team_id');
            t.integer('team2_id').references('team_details.team_id');
            t.dateTime('date_and_time');
            t.integer('result');
        }),
        knex.schema.createTable('results', function (t) {
            t.integer('result_id').unsigned().primary();
            t.integer('match_id').references('match_details.match_id');
            t.integer('winner').references('team_details.team_id');
        }),
        knex.schema.createTable('interest_details', function (t) {
            t.integer('player_id').references('player_details.player_id');
            t.integer('game_id').references('game_details.game_id');
            t.integer('category_id').references('game_category_details.category_id');
        }),
        knex.schema.createTable('gallery', function (t) {
            t.string('photo').unsigned().primary();
            t.integer('group_id').references('group_details.group_id');
        }),
    ]);
};


exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('gallery'),
        knex.schema.dropTable('interest_details'),
        knex.schema.dropTable('results'),
        knex.schema.dropTable('match_details'),
        knex.schema.dropTable('player_team_details'),
        knex.schema.dropTable('game_category_details'),
        knex.schema.dropTable('team_details'),
        knex.schema.dropTable('player_details'),
        knex.schema.dropTable('game_details'),
        knex.schema.dropTable('group_details')
    ]);
};
