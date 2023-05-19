// http://localhost:5000/api/v1/movies
const express = require("express");
const moviesController = require("../controllers/MoviesController");
const refreshToken = require("../midlewares/refreshToken");
const rolesMidleware = require("../midlewares/rolesMidleware");

const moviesRouter = express.Router();
// додати фільм
moviesRouter.post(
  "/movies",
  (req, res, next) => {
    console.log("спрацював Joi");
    next();
  },
  moviesController.add
);
// отримати всі фільми
moviesRouter.get(
  "/movies",
  // refreshToken,
  rolesMidleware(["ADMIN", "MODERATOR"]),
  (req, res, next) => {
    console.log("спрацював Joi");
    next();
  },
  moviesController.getAll
);
// отримати 1 фільм
moviesRouter.get(
  "/movies/:id",
  (req, res, next) => {
    console.log("спрацював Joi");
    next();
  },
  moviesController.getOne
);
// обновити фільм
moviesRouter.patch(
  "/movies/:id",
  (req, res, next) => {
    console.log("спрацював Joi");
    next();
  },
  moviesController.update
);
//видалити фільм
moviesRouter.delete(
  "/movies/:id",
  (req, res, next) => {
    console.log("спрацював Joi");
    next();
  },
  moviesController.remove
);

module.exports = moviesRouter;
