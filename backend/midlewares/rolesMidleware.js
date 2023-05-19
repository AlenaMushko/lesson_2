const jwt = require("jsonwebtoken");
const UsersModel = require("../models/UsersModel");

module.exports = (rolesArr) => {
  return async (req, res, next) => {
    try {
      const [type, token] = req.headers.authorization.split(" ");

      if ("Bearer" === type || token) {
        const { id } = jwt.verify(token, "pizza");

        const user = await UsersModel.findById(id);
        let hasRole = false;
        rolesArr.forEach((role) => {
          if (user.roles.includes(role)) {
            hasRole = true;
          }
        });

        if (!hasRole) {
          return res.status(403).json({ message: "Forbidden" });
        }
      }
      next();
    } catch (error) {
      res.status(404).json({ message: "Unauthorized" });
    }
  };
};
