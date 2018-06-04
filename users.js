
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'ujwala', mobileNumber:'9564813450'},
        {id: 2, username: 'ujwala reddy', mobileNumber:'9564458125'},
        {id: 3, username: 'g ujwala reddy', mobileNumber:'9893325450'}
      ]);
    });
};
