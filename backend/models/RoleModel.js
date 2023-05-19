// const Cat = mongoose.model('Cat', { name: String });
const { model, Schema } = require("mongoose");

const RoleSchema = Schema({
  value: { type: String, unique: true, default: "USER" },
});

module.exports = model("role", RoleSchema);
