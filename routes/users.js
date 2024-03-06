const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
});

var userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  mobileNumber: Number,
  profession: String,
  password: String,
  profilePic: String
});

module.exports = mongoose.model("User", userSchema);
