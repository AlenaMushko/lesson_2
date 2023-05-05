// http://localhost:5000/api/v1/movies
const express =  require("express");
const moviesController = require("../controllers/MoviesController");

const moviesRouter = express.Router();
// додати фільм
moviesRouter.post("/movies", (req, res, next)=>{ console.log("спрацював Joi"); next()}, moviesController.add);
// отримати всі фільми
moviesRouter.get("/movies", moviesController.getAll);
// отримати 1 фільм
moviesRouter.get("/movies/:id", moviesController.getOne);
// обновити фільм
moviesRouter.patch("/movies/:id", moviesController.update);
//видалити фільм
moviesRouter.delete("/movies/:id", moviesController.remove);



module.exports = moviesRouter;