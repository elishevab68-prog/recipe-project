const express = require('express');
const router = express.Router();
const { getAllRecipes } = require('../controllers/recipeController');
const {createRecipe}=require('../controllers/recipeController')
const { deleteRecipe } = require('../controllers/recipeController');

router.get('/', getAllRecipes);
router.post('/', createRecipe);
router.delete('/:id', deleteRecipe);


module.exports = router;