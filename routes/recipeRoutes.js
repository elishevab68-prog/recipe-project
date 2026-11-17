const express = require('express');
const router = express.Router();
const { getAllRecipes,getRecipeById,createRecipe, deleteRecipe  } = require('../controllers/recipeController');
router.get('/', getAllRecipes);
router.post('/', validate(recipeValidationSchema), createRecipe); 
router.delete('/:id', deleteRecipe);
router.get('/:id', getRecipeById);

module.exports = router;