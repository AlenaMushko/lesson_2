// const Cat = mongoose.model('Cat', { name: String });
const { model, Schema } = require("mongoose");

const MoviesSchema = Schema({
  title: {
    type: String,
    required: [true, "db:title is required"],
  },
  genre: {
    type: String,
    default: "comedy",
  },
  rating: {
    type: Number,
    required:[true, "db:rating is required"],
  },
});

module.exports = model("movies", MoviesSchema);
