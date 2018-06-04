
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('player_details').del()
    .then(function () {
      // Inserts seed entries
      return knex('player_details').insert([
        {name: 'P1', gender: 'F'},
        {name: 'P2', gender: 'M'},
        {name: 'P3', gender: 'M'},
        {name: 'P4', gender: 'F'},
        {name: 'P5', gender: 'F'},
        {name: 'P6', gender: 'F'}               
      ]);
    });
};
