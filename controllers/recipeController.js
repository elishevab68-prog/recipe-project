const Recipe = require('../models/recipes');
const { isValidObjectId } = require('mongoose');
const AppError = require('../utils/AppError');

const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find(); 
    res.status(200).json(recipes);     
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
    try {
        const recipeId = req.params.id;
        if (!isValidObjectId(recipeId))
            throw new AppError("recipe not found", 404);
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

        if (!deletedRecipe) {
            throw new AppError("recipe not found", 404);
        }
        res.status(200).json({ message: 'Recipe deleted successfully', deletedRecipe });
    } catch (error) {
        next(error);
    }
};

const getRecipeById = async (req, res, next) => {
  try{
    const recipeId = req.params.id;
    if (!isValidObjectId(recipeId))
      throw new AppError("recipe not found", 404);
    const recipe = await Recipe.findById(recipeId);
    if(!recipe){
      throw new AppError("recipe not found", 404);
    }
    return res.status(200).json(recipe);

  } catch (err) {
    next(err);
  }
}

const createRecipe = async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
    try {
    const { id } = req.params;

    if (!isValidObjectId(id)) 
        throw new AppError("recipe not found", 404);
    const recipe = await Recipe.findByIdAndUpdate(id,
        { $set: req.body },
        { new: true });

    if (!recipe)
        throw new AppError("recipe not found", 404);
    return res.json(recipe);
    } catch (err) {
        next(err);
    }
};

module.exports = { 
    getAllRecipes, 
    createRecipe, 
    deleteRecipe,
    getRecipeById,
    updateRecipe
};