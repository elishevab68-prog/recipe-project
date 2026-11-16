const errorHandler = require('./middlewares/errorHandler');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const logger = require('./middlewares/logger');
const app = express();


dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use(errorMiddleware);

app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);

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
