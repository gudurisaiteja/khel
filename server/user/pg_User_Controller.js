const knexConfig = require('../../knexfile');
var knex = require('knex')(knexConfig.development);
var bookshelf = require('bookshelf')(knex);
 
var User = bookshelf.Model.extend({
  tableName: 'users'
});
 

module.exports = {User}