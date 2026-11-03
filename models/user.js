const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
  
  UserName:{
    type: String,     
    required: true,   
 
  },
  
  Email:{
    type: String,   
    required: true,   
    unique: true,     
    lowercase: true,  
   
  },
  
  Password:{
    type: String,    
    required: true    
  }});

const User = mongoose.model('User', userSchema);

module.exports = User;