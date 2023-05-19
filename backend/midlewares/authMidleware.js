const jwt = require("jsonwebtoken");
const UsersModel = require("../models/UsersModel");

module.exports = async (req, res, next) => {
  //1.Читаєм токен із заголовка
  //2. перевіряємо, що це саме токен авторизації

  //3. якщо токен передали і він Bearer то розшифровуємо токен
  //4. віддаєм інфу про користувача далі.
  try {
    const [type, token] = req.headers.authorization.split(" ");
    console.log(type);
    console.log(token);
    if ("Bearer" === type || token) {
      const { id } = jwt.verify(token, "pizza");
      const user = await UsersModel.findById(id);

      req.user = user._id;
      next();
    }
  } catch (error) {
    res.status(404).json({ message: "Unauthorized" });
  }
};
