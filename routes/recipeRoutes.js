const express = require('express');
const router = express.Router();

const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  searchRecipes,
  updateRecipeIngredients,
  getRecipesByUser
} = require('../controllers/recipeController');

const { validate } = require('../middlewares/recipes.middleware');
const {
  recipeValidationSchema,
  searchRecipeSchema,
  updateIngredientsSchema
} = require('../validations/recipeValidation');

router.get('/search', validate(searchRecipeSchema, 'query'), searchRecipes);
router.get('/user/:userId', getRecipesByUser);

router.get('/', getAllRecipes);
router.post('/', validate(recipeValidationSchema, 'body'), createRecipe);
router.patch('/:id/ingredients', validate(updateIngredientsSchema, 'body'), updateRecipeIngredients);
router.get('/:id', getRecipeById);
router.put('/:id', validate(recipeValidationSchema, 'body'), updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;