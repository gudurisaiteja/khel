const knex = require('knex');
const bookshelf = require('bookshelf');
const knexConfig = require('../knexfile');

module.exports = bookshelf(knex(knexConfig.development));


// const knex = require('knex');
// const bookshelf = require('bookshelf');
// const knexConfig = require('../knexfile');
// var knexinst=knex(knexConfig.development);
// module.exports = bookshelf(knex(knexConfig.development));
 
//  knexinst('users').select()
//  .then((data)=>{

// console.log(data);
//  });