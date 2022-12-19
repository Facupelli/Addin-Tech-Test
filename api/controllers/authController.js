const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SUPER_SECRET_KEY, {
    expiresIn: 3 * 24 * 60 * 60, //3 days
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message === "incorrect email") {
    errors.email = "Email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "Password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
  }

  if (err.message.includes("users validation failed")) {
    errors.password = "Password or Email is incorrect";
  }
  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.create({ email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ user: { email: user.email, id: user._id }, created: true });
  } catch (e) {
    console.log(e);
    const errors = handleErrors(e);

    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: false,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      withCredentials: true,
    });

    res
      .status(200)
      .json({ user: { email: user.email, id: user._id }, created: true });
  } catch (e) {
    console.log(e);
    const errors = handleErrors(e);

    res.json({ errors, created: false });
  }
};
