const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes')
const app = express();


dotenv.config();

app.use(express.json());

connectDB();

app.use('/recipes', recipeRoutes);

app.get('/', (req, res) => {
  res.send('Recipe Sharing Platform API is running...');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
