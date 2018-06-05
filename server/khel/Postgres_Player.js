const knexConfig = require('../../knexfile');
var knex = require('knex')(knexConfig.development);
var bookshelf = require('bookshelf')(knex);
 
var player_details = bookshelf.Model.extend({
  tableName: 'player_details'
});
 
var game_details = bookshelf.Model.extend({
  tableName: 'game_details'
});

module.exports = {player_details,game_details,knex}