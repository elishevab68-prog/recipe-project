const Recipe = require('../models/recipes')

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message })
  } 
}

const createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body)
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { getAllRecipes, createRecipe }