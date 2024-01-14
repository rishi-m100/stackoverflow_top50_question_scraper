const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const UserModel = mongoose.model("questions", UserSchema);

module.exports = UserModel;
