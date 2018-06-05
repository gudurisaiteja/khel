
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('interest_details').del()
    .then(function () {
      // Inserts seed entries
      return knex('interest_details').insert([
        {player_id: 1, game_id: '1', interested_in_singles:true,interested_in_doubles:false,interested_in_mixeddoubles:false},
        {player_id: 2, game_id: '2', interested_in_singles:false,interested_in_doubles:true,interested_in_mixeddoubles:false},
        {player_id: 3, game_id: '2', interested_in_singles:false,interested_in_doubles:true,interested_in_mixeddoubles:false},
        {player_id: 4, game_id: '1', interested_in_singles:true,interested_in_doubles:false,interested_in_mixeddoubles:false},
        {player_id: 5, game_id: '1', interested_in_singles:true,interested_in_doubles:false,interested_in_mixeddoubles:false},
        {player_id: 6, game_id: '1', interested_in_singles:true,interested_in_doubles:false,interested_in_mixeddoubles:false}        
      ]);
    });
};
