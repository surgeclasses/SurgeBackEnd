const User = require("../models/admin");

const postVerifyUser = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    res.json({ verified: false });
  }
  if (!user) {
    res.json({ verified: false });
  }
  let isVerified = true;
  if (user.password != password) {
    isVerified = false;
  }
  res.json({ verified: isVerified });
};

exports.postVerifyUser = postVerifyUser;
