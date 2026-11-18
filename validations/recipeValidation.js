const Joi = require('joi');

const recipeValidationSchema = Joi.object({
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    Ingredients: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        amount: Joi.number().required(),
        unit: Joi.string().required()
    })).min(1).required(),
    PrepTime: Joi.number().min(1).required(),
    Category: Joi.string().valid('פתיחה', 'עיקרי', 'אחרונה').required(),
    CreateBy: Joi.string().hex().length(24).required(),
    Image: Joi.string().allow('').optional()
});

// סכמה לחיפוש לפי שם או קטגוריה
const searchRecipeSchema = Joi.object({
    name: Joi.string().optional(),
    category: Joi.string().valid('פתיחה', 'עיקרי', 'אחרונה').optional()
});

// סכמה לעדכון רכיבים
const updateIngredientsSchema = Joi.object({
    Ingredients: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        amount: Joi.number().required(),
        unit: Joi.string().required()
    })).min(1).required()
});

module.exports = {
    recipeValidationSchema,
    searchRecipeSchema,
    updateIngredientsSchema
};