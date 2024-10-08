const { User } = require("../models");

exports.index = async (req, res) => {
  const user = await User.findAll();

  res.json(user);
};

exports.register = async (req, res) => {
  try {
    const user = await User.register(req.body);

    const { id } = user;

    res.json({
      id,
      accessToken: user.generateToken(),
    });
  } catch (error) {
    res.status(422).json({ error });
  }
};
