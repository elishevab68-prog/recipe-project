const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');


dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use(errorMiddleware);

connectDB();
app.use(express.urlencoded({ extended: true }));

app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Recipe Sharing Platform API is running...');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
