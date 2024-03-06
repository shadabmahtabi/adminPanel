const express = require("express");
const userModel = require("./users");
const ImageKit = require('../imagekit').initImagekit();
const path = require("path");
const multer = require("multer");
const router = express.Router();

// multer
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

// GET /
router.get("/", (req, res, next) => {
  res.render("signup", { title: "Signup" });
});

// POST /create
router.post("/create", async (req, res, next) => {
  const user = await new userModel(req.body).save();

  res.render("profile", { title: "profile", user });
});

router.post("/profilepic/:id", upload.single("profilePic"), async (req, res, next) => {
    try {
      let user = await userModel.findById(req.params.id).exec();
      const file = req.file;

      const modified_filename = `profilepic-${Date.now()}${path.extname(
        file.originalname
      )}`;

      if (user.profilePic.fileId !== "") {
        await ImageKit.deleteFile(user.profilePic.fileId);
      }

      const { fileId, url } = await ImageKit.upload({
        file: file.buffer,
        fileName: modified_filename,
      });

      user.profilePic = { fileId, url };
      await user.save();
    } catch (err) {
      console.log(err);
    }

    res.redirect('/')

});

module.exports = router;
