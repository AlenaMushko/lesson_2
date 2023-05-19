const asyncHandler = require("express-async-handler");
const MoviesModel = require("../models/MoviesModel");

//  console.log("moviesModel ==>", moviesModel);

class MoviesController {
  add = asyncHandler(async (req, res) => {
    const { title, rating } = req.body;
    if (!title || !rating) {
      res.status(400);
      throw new Error("provide all required fields");
    }
    const movie = await MoviesModel.create({ ...req.body });

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
  //       const movie = await MoviesModel.create({ ...req.body });

  //       return res.status(201).json({ data: movie });
  //     } catch (error) {
  //         return  res.send(error.message);
  //     }
  //   };

  getAll = asyncHandler(async (req, res) => {
    const result = await MoviesModel.find();
     res.status(200);
    return res.json(result);
   
  });

  getOne = asyncHandler(async(req, res) => {
    const {id}= req.params;
    const movie = await MoviesModel.findOne({ _id: id });
    if (!movie) {
      res.status(404);
      throw new Error("Movie not found");
    };
    return res.status(200).json({ data: movie });
  });

  update =  asyncHandler(async (req, res) => {
    const {id}= req.params;  
    const updatedMovie = await MoviesModel.findOneAndUpdate(id, req.body, {
      new: true, // Повертає оновлену версію фільма
      runValidators: true, // Виконує перевірку валідаторів моделі
    });
    if (!updatedMovie) {
      res.status(404);
      throw new Error("Movie not found");
    };
  
    return res.status(200).json({ data: updatedMovie });
  });

  remove = asyncHandler(async (req, res) => {
    const {id}= req.params;
    const movie = await MoviesModel.findOneAndRemove(id);
    if (!movie) {
      res.status(404);
      throw new Error("Movie not found");
    };
    return res.status(200).json({ data: movie, message:'Delete success' });
  });
}

module.exports = new MoviesController();
