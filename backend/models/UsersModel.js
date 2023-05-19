// const Cat = mongoose.model('Cat', { name: String });
const { model, Schema } = require("mongoose");

const UserSchema = Schema({
  name: { type: String, default: "Sara" },
  email: {
    type: String,
    required: [true, "db:email is required"],
  },
  password: {
    type: String,
    required: [true, "db:password is required"],
  },
  token: {
    type: String,
    default: null,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  roles: [{ type: String, ref: "role" }],
});

module.exports = model("user", UserSchema);
