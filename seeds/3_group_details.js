
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('group_details').del()
    .then(function () {
      // Inserts seed entries
      return knex('group_details').insert([
        {group_id: 1, name: 'A',logo:'No logo'},
        {group_id: 2, name: 'B',logo:'No logo'},
        {group_id: 3, name: 'C',logo:'No logo'},
        {group_id: 4, name: 'D',logo:'No logo'}        
      ]);
    });
};
