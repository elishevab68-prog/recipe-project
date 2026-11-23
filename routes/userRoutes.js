const express = require('express');
const router = express.Router();

const { createUser, login } = require('../controllers/userController');
const { validate } = require('../middlewares/recipes.middleware'); 
const { loginSchema } = require('../validations/userValidation');

router.post('/register', createUser);
router.post('/login', validate(loginSchema, 'body'), login);

module.exports = router;