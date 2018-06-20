const config = require('../../config/config');
const matches = require('./matches.js');

/**
 * Store player interests into interest_details table
 */
function interests(req, res, next) {
    const playerID = req.body.player_id;
    const gameID = req.body.game_id;
    const categoryID = req.body.category_id;
    const insertIntoInterestDetailsQuery = 'INSERT INTO interest_details VALUES('
+ playerID + ',' + gameID + ',' + categoryID + ')';
    next();
}

module.exports = {};
