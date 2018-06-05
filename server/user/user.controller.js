const User = require('./pg_User_Controller.js').User;
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  //User.forge(){
    console.log('saas');
    next();

}

// User.get(id)
//   .then((user) => {
//     req.user = user; // eslint-disable-line no-param-reassign
//     return next();
//   })
//   .catch(e => next(e));


/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  const userId = req.params.user_id;
  new User().where({ id: userId })
    .fetch({ columns: ['id', 'username', 'mobileNumber'] })
    .then(function (user) {
      res.send(user);
    }).catch(function (err) {
      res.status(500).json({ error: err });
    });
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  User.forge(
    {
      username: req.body.username,
      mobileNumber: req.body.mobileNumber,
      token: jwt.sign({ username: req.body.username }, config.jwtSecret)
    })
    .save()
    .then(function (data) {
      res.send(data);
    })
    .catch(err => res.status(500).json({ error: err }));

}
// user.save()
//   .then(savedUser => res.json(savedUser))
//   .catch(e => next(e));

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res) {
  const userId = req.params.user_id;
  var storedToken;
  var token = req.get('Authorization');
  new User().where({ id: userId }).fetch({ columns: ['token'] }).then(
    function (user) {
      storedToken = user.toJSON().token
      if (token == storedToken) {
        new User({ id: userId })
          .save(req.body, { patch: true })
          .then(function (data) {
            res.send(data);
          })
          .catch(err => res.status(500).json({ error: err }));
      }
      else {
        res.send('Unauthorised User');
      }
    }
  )
}


/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  new User().fetchAll({ columns: ['id', 'username', 'mobileNumber'] }).then(function (user) {
    res.send(user);
  }).catch(err => res.status(500).json({ error: err }));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const userId = req.params.user_id;
  var storedToken;
  var token = req.get('Authorization');
  new User().where({ id: userId }).fetch({ columns: ['token'] }).then(function (user) {
    storedToken = user.toJSON().token
    if (token == storedToken) {
      new User({ id: userId })
        .destroy()
        .then(function (data) {
          res.send("User deleted");
        })
        .catch(err => res.status(500).json({ error: err }));
    }
    else {
      res.send('Unauthorised User');
    }

  });
}

module.exports = { load, get, create, update, list, remove };
