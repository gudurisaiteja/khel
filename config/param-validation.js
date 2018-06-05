const Joi = require('joi');

module.exports = {
  // POST /api/users
  createPlayer: {
    body: {
      Name: Joi.string().required(),
      Email: Joi.string().regex(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/).required(),
      Mobile:Joi.integer().regex(/^[1-9][0-9]{9}$/).required(),
      password:Joi.string().required(),
      Gender:Joi.string().required(),
      Role:Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/)
    },
    params: {
      user_id: Joi.string().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
