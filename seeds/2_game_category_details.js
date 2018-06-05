exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('game_category_details').del()
    .then(function () {
      // Inserts seed entries
      return knex('game_category_details').insert([
        {category_id: 11, game_id: 1, category_name:'Singles', no_of_players:1},
       {category_id: 12, game_id: 1, category_name:'Doubles', no_of_players:2},
       {category_id: 21, game_id: 2, category_name:'Singles', no_of_players:1},
       {category_id: 22, game_id: 2, category_name:'Doubles', no_of_players:2},
        {category_id: 31, game_id: 3, category_name:'Singles', no_of_players:1}
      ]);
    });
};
