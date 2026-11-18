const express = require('express');
const router = express.Router();
const { getAllRecipes } = require('../controllers/recipeController.js');
const { createRecipe } = require('../controllers/recipeController.js');
const { deleteRecipe } = require('../controllers/recipeController.js');
const { getRecipeById } = require('../controllers/recipeController.js');
const { updateRecipe } = require('../controllers/recipeController.js');

const { validate } = require('../middlewares/recipes.middleware.js'); 
const { recipeValidationSchema } = require('../validations/recipeValidation.js');

router.get('/', getAllRecipes);
router.post('/', validate(recipeValidationSchema), createRecipe); 
router.delete('/:id', deleteRecipe);
router.get('/:id', getRecipeById);
router.put('/:id', validate(recipeValidationSchema), updateRecipe);
module.exports = router;