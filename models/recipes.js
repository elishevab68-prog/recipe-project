const mongoose = require('mongoose'); 


const recipeSchema = new mongoose.Schema({
  
  Name:{
    type: String,     
    required: true,  
  },
  
  Description:{
    type: String,     
    required: true    
  },
  
  Ingredients:{
    type: [String],  
    required: true    
  },
  
  PrepTime:{
    type: Number,    
    required: true    
  },
  
  Category:{
    type: String,  
    required: true,   
    enum: ['פתיחה', 'עיקרי', 'אחרונה'] 
  },
  
  Image:{
    type: String    
  }

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;