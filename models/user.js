const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function() {
    if (!this.isModified('Password')) { // אם הסיסמא לא השתנתה
        return;
    }

    const saltRounds = +(process.env.SALT_ROUNDS ?? "12"); // משתנה סביבה
    this.Password = await bcrypt.hash(this.Password, saltRounds);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.Password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;