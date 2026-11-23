const User = require('../models/user');
const AppError = require('../utils/AppError');
const { createToken } = require('../utils/jwt');

const createUser = async (req, res) => {
  const { UserName, Email, Password } = req.body;

  if (!UserName || !Email || !Password) {
    throw new AppError('UserName, Email, and Password are required', 400);
  }

  const user = await User.create({ UserName, Email, Password });
  const token = createToken(user);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      id: user._id,
      UserName: user.UserName,
      Email: user.Email
    }
  });
};

const login = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    throw new AppError('Email and Password are required', 400);
  }

  const user = await User.findOne({ Email });

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isMatch = await user.comparePassword(Password);

  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = createToken(user);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      id: user._id,
      UserName: user.UserName,
      Email: user.Email
    }
  });
};

module.exports = { createUser, login };