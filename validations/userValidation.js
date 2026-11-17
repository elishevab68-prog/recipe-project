const Joi = require('joi');

const userValidationSchema = Joi.object({
    UserName: Joi.string().required(),
    Email: Joi.string().email().required(),
    Password: Joi.string().required()
});

module.exports = {
    userValidationSchema
};