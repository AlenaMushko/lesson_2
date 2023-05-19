const jwt = require("jsonwebtoken");
const UsersModel = require("../models/UsersModel");

function generateToken(data) {
  const payload = { ...data };
  return jwt.sign(payload, "pizza", { expiresIn: "5h" });
}

module.exports = async (req, res, next) => {
  try {
    const checkToken = await UsersModel.findOne({ email });
    const isValidToken = jwt.verify(checkToken.token, "pizza");
    if (isValidToken.token) {
      checkToken.token = generateToken({ id: checkToken._id });
      await checkToken.save();
      next();
    }
  } catch (error) {
    res.status(404).json({ message: "Unauthorized" });
  }
};
