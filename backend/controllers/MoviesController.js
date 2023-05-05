const asyncHandler = require("express-async-handler");
const moviesModel = require("../models/MoviesModel");

//  console.log("moviesModel ==>", moviesModel);

class MoviesController {
  add = asyncHandler(async (req, res) => {
    const { title, rating } = req.body;
    if (!title || !rating) {
        res.status(400);
        throw new Error("provide all required fields")
    //   return res.status(400).json({
    //     code: 400,
    //     message: "provide all required fields",
    //   });
    }
    const movie = await moviesModel.create({ ...req.body });

    return res.status(201).json({ data: movie });
  });
  //   add = async (req, res) => {
  //     try {
  //       const { title, rating } = req.body;
  //       if ( !title || !rating){
  //      return  res.status(400).json({
  //             code:400,
  //             message:"provide all required fields",
  //         })
  //       }
  //       const movie = await moviesModel.create({ ...req.body });

  //       return res.status(201).json({ data: movie });
  //     } catch (error) {
  //         return  res.send(error.message);
  //     }
  //   };
  getAll = async (req, res) => {
    console.log("отримати всі фільми");
  };
  getOne = (req, res) => {
    console.log("отримати 1 фільм");
  };
  update = (req, res) => {
    console.log("обновити фільм");
  };
  remove = (req, res) => {
    console.log("видалити фільм");
  };
}

module.exports = new MoviesController();
