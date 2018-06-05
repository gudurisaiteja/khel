const knex = require('knex');
const bookshelf = require('bookshelf');
const knexConfig = require('./knexfile');
const knexinst=knex(knexConfig.development)
const bookshelfinst=bookshelf(knexinst);
module.exports ={
    bookshelf:bookshelfinst,
    knexinst
}
knexinst('game_details').select('')
.then((data)=>{ console.log(data);
});