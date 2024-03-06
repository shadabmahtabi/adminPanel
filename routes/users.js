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
  profilePic: {
    type: Object,
    default: {
      fileId: '',
      url: 'https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?q=80&w=1781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  }
});

module.exports = mongoose.model("User", userSchema);
