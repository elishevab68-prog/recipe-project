const Recipe = require('../models/recipes');
const AppError = require('../utils/AppError');

const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate('createBy', 'name email');
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('createBy', 'name email');
    if (!recipe) {
      return next(new AppError("The recipe does not exist on the web", 404));
    }
    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
};

// 3. חיפוש מתכונים לפי שם ו/או קטגוריה
const searchRecipes = async (req, res, next) => {
  try {
    const { name, category } = req.query;
    const filter = {};

    if (name) {
      filter.Name = { $regex: name, $options: 'i' }; // חיפוש חלקי בשם המתכון
    }
    if (category) {
      filter.Category = category; // סינון לפי קטגוריה
    }

    const recipes = await Recipe.find(filter).populate('createBy', 'name email');
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

//עדכון רכיבים של מתכון קיים
const updateRecipeIngredients = async (req, res, next) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { Ingredients: req.body.Ingredients }, // מעדכן רק את מערך הרכיבים
      { new: true, runValidators: true }     // מחזיר את המתכון המעודכן
    ).populate('createBy', 'name email');

    if (!updatedRecipe) {
      return next(new AppError("Recipe not found", 404));
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    next(error);
  }
};

// 5. שליפת כל המתכונים של משתמש מסוים (שאילתה שמשלבת בין משתמש למתכונים)
const getRecipesByUser = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ createBy: req.params.userId }).populate('createBy', 'name email');
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return next(new AppError("Recipe not found", 404));
    }
    res.status(200).json({ message: 'Recipe deleted successfully', deletedRecipe });
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

module.exports = {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  getRecipeById,
  searchRecipes,
  updateRecipeIngredients,
  getRecipesByUser
};