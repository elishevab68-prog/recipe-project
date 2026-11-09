const Recipe = require('../models/recipes');

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find(); 
    res.status(200).json(recipes);     
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try{
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    if(!recipe){
      return res.status(404).json({  message:"The recipe does not exist on the web"})
    }
    return res.status(200).json(recipe);

  }catch(err){
    return res.status(500).json({  title:"שגיאת שרת",message:err.message})
  }
}

const createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllRecipes ,getRecipeById,createRecipe};