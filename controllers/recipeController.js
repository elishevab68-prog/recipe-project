const Recipe = require('../models/recipes');
const { isValidObjectId } = require('mongoose');
const AppError = require('../utils/AppError');

const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate('CreateBy', 'UserName Email');
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const recipeId = req.params.id;

    if (!isValidObjectId(recipeId))
      throw new AppError("recipe not found", 404);

    const recipe = await Recipe.findById(recipeId).populate('CreateBy', 'UserName Email');

    if (!recipe)
      throw new AppError("recipe not found", 404);

    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

const searchRecipes = async (req, res, next) => {
  try {
    const { name, category } = req.query;
    const filter = {};

    if (name) {
      filter.Name = { $regex: name, $options: 'i' };
    }

    if (category) {
      filter.Category = category;
    }

    const recipes = await Recipe.find(filter).populate('CreateBy', 'UserName Email');
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

const updateRecipeIngredients = async (req, res, next) => {
  try {
    const recipeId = req.params.id;

    if (!isValidObjectId(recipeId))
      throw new AppError("recipe not found", 404);

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { Ingredients: req.body.Ingredients },
      { new: true, runValidators: true }
    ).populate('CreateBy', 'UserName Email');

    if (!updatedRecipe)
      throw new AppError("recipe not found", 404);

    res.status(200).json(updatedRecipe);
  } catch (error) {
    next(error);
  }
};

const getRecipesByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (!isValidObjectId(userId))
      throw new AppError("user not found", 404);

    const recipes = await Recipe.find({ CreateBy: userId }).populate('CreateBy', 'UserName Email');

    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
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

    if (!deletedRecipe)
      throw new AppError("recipe not found", 404);

    res.status(200).json({ message: 'Recipe deleted successfully', deletedRecipe });
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id))
      throw new AppError("recipe not found", 404);

    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!recipe)
      throw new AppError("recipe not found", 404);

    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  getRecipeById,
  updateRecipe,
  searchRecipes,
  updateRecipeIngredients,
  getRecipesByUser
};