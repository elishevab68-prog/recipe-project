const Joi = require('joi');

const recipeValidationSchema = Joi.object({
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    Ingredients: Joi.array().items(Joi.string()).required(),
    PrepTime: Joi.number().required(),
    Category: Joi.string().required(),
    Image: Joi.string().optional() 
});

module.exports = {
    recipeValidationSchema
};