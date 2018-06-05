const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');

const expressJwt = require('express-jwt');

const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put([validate(paramValidation.updateUser),expressJwt({ secret: config.jwtSecret })], userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('username', userCtrl.load);

module.exports = router;
