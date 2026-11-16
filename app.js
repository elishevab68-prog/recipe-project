const errorHandler = require('./middlewares/errorHandler');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const { printMsg } = require('./middlewares/recipes.middleware');
const app = express();


dotenv.config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/recipes', recipeRoutes);
app.use(printMsg);


app.get('/', (req, res) => {
  res.send('Recipe Sharing Platform API is running...');
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error(`Unable to start server: ${error.message}`);
  process.exitCode = 1;
});
