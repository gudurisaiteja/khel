const User = require('./Postgres_Player.js').User;
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

function create(req, res, next) {
  User.forge(
    {
       Name: req.body.Name,
       Email: req.body.Email,
       Mobile: req.body.Mobile,
       EncryptedPassword: jwt.sign({Password:req.body.password }, config.jwtSecret),
       Gender: req.body.Gender,
       Role: req.body.Role
    })
    .save()
    .then(function (data) {
      res.send(data);
    })
    .catch(err => res.status(500).json({ error: err }));

}