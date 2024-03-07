const express = require("express");
const userModel = require("./users");
const ImageKit = require("../imagekit").initImagekit();
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
router.post("/create", upload.single("profilePic"), async (req, res, next) => {
  try {
    const file = req.file;
    const modified_filename = `profilePic-${Date.now()}${path.extname(
      file.originalname
    )}`;

    const { fileId, url } = await ImageKit.upload({
      file: file.buffer,
      fileName: modified_filename,
    });

    const { name, username, email, password, profession, mobileNumber } =
      req.body;

    const user = await new userModel({
      name,
      username,
      password,
      email,
      mobileNumber,
      profession,
      profilePic: { fileId, url },
    }).save();
    res.redirect('back');

  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/profilepic/:id",
  upload.single("profilePic"),
  async (req, res, next) => {
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

    res.redirect("/");
  }
);

module.exports = router;
