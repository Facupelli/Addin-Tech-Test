const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      process.env.SUPER_SECRET_KEY,
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          const user = await User.findById(decodedToken.id);
          if (User) {
            res.json({
              status: true,
              user: { email: user.email, id: user._id },
            });
          } else {
            res.json({ status: false });
          }
          next();
        }
      }
    );
  } else {
    res.json({ status: false });
    next();
  }
};
