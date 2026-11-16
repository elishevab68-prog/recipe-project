const Recipe = require('../models/recipes');
const AppError = require('../utils/AppError')
const getAllRecipes = async (req, res,next) => {
  try {
    const recipes = await Recipe.find(); 
    res.status(200).json(recipes);     
  } catch (error) {
      next(error);
  }
};

const getRecipeById = async (req, res,next) => {
  try{
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    if(!recipe){
      return next(new AppError("The recipe does not exist on the web",404));
    }
    return res.status(200).json(recipe);

  }catch(err){
    next(err);
  }
}


const deleteRecipe = async (req, res,next) => {
    try {
        const recipeId = req.params.id;
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

        if (!deletedRecipe) {
            return next(new AppError("Recipe not found", 404));
        }

        res.status(200).json({ message: 'Recipe deleted successfully', deletedRecipe });

    } catch (error) {
        next(error);
    }
};

const createRecipe = async (req, res,next) => {
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
    getRecipeById 
};
