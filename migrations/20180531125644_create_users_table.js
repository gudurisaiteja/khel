
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(t) {
        t.increments('id').unsigned().primary();
        t.string('username').notNull();
        t.string('mobileNumber').notNull();
        t.dateTime('createdAt').nullable();
        t.string('token').notNull();
    });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
