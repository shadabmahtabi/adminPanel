const express = require("express");
const userModel = require("./users");
const router = express.Router();

// GET /
router.get("/", (req, res, next) => {
    res.render('signup', {title: 'Signup'})
});

// POST /create
router.post("/create", async (req, res, next) => {

    const user = await new userModel(req.body).save();
    
    res.redirect('back')
});

module.exports = router;
