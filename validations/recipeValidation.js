const Joi = require('joi');

const recipeValidationSchema = Joi.object({
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    Ingredients: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    amount: Joi.number().required(),
    unit: Joi.string().required()
})).required(),
    PrepTime: Joi.number().required(),
    Category: Joi.string().required(),
    Image: Joi.string().optional() 
});

module.exports = {
    recipeValidationSchema
};