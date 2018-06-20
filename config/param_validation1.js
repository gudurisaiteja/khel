const Joi = require('joi');

module.exports = {
    // POST /playerInterests
    playerInterests: {
        body: {
            player_id: Joi.integer().required(),
            game_id: Joi.integer().required().min(1),
            category_id: Joi.integer().min(1).required()
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
