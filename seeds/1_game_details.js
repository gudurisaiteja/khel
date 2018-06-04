exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('game_category_details').del()
    .then(function () {
      knex('game_details').del()
      .then(function(){
      // Inserts seed entries
      return knex('game_details').insert([
        {game_id: 1, name: 'TT'},
        {game_id: 2, name: 'Carroms'},
        {game_id: 3, name: 'Chess'}
      ]);
    });
});
}