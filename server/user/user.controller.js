const User = require('./user.model');
const dbconn=require('./Dbconn.js');
var knexinst=dbconn.knexinst;
var bookshelf = require('bookshelf')(knexinst);




/**
 * Load user and append to req.
 */

function load(req, res, next, username) {
 
  knexinst('users').where({username:username}).select('username','mobilenumber')
  .then((data)=>res.send(data))
  .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  // return res.json(req.user);
  knexinst('users').where({id:req.params.userId}).select('id','username','mobilenumber')
  .then((data)=>res.send(data))
  .catch(e => next(e));

}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  console.log();
  
  const user = {
    username: req.body.username,
    mobilenumber: req.body.mobileNumber,
    password:req.body.password,

    };
  console.log('in create');
  
    knexinst('users').insert(user)
    .then((a)=>{
      console.log('in insert',a);
      
      res.send('inserted');

    })
    .catch((e) => {
      console.error(e);
      
      next();
    }
    );

    //res.send('ok');
    
  }
  
  
  

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */

function update(req, res, next) {
  const user = req.user;
  console.log("update req.user",req.user);
  var toUpdate=req.body;
  knexinst('users')
  .where({username:req.user.username})
  .update(toUpdate)
  .then((data)=>res.send('updated'))
  .catch(e=>next(e));

    //   console.log('user',toUpdate);
    
    // res.send('in update');
 
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  // const { limit = 50, skip = 0 } = req.query;
  // User.list({ limit, skip })
  //   .then(users => res.json(users))
  //   .catch(e => next(e));

  knexinst.select('username','mobilenumber').from('users')
  .then((data)=>res.send(data))
  .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
 
  console.log(typeof(req.params.userId));
  knexinst('users').where('id', parseInt(req.params.userId))
    .del()
    .then((data)=>{ 
      console.log('Here');
      res.status(200).json(data); 
     })
    .catch(e=>next(e));
   //res.send('in delete'); 
}

module.exports = { load, get, create, update, list, remove,knexinst };
