const User = require('../models/user');
const AppError = require('../utils/AppError');

const createUser = async (req, res, next) => {
  const { UserName, Email, Password } = req.body;

  if (!UserName || !Email || !Password) {
    throw new AppError('UserName, Email, and Password are required', 400);
  }

  const user = await User.create({ UserName, Email, Password });

  res.status(201).json({
    status: 'success',
    data: {
      id: user._id,
      UserName: user.UserName,
      Email: user.Email
    }
  });
};

module.exports = { createUser };
