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
  
  CreateBy: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true//מתכון חייב להיות משוייך למשתמש
  },

  Image:{
    type: String, 
    trim: true,
    default: ''  
  }

},{
  timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;