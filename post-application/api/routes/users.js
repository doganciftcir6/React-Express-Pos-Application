const User = require("../models/User");
const express = require("express");
const router = express.Router();

//router üzerineden http işlemlerimi yapabilirim.

//veritabanı işlemleri olacağı için async olmak zorunda
//!getall
router.get("/get-all", async (req,res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

//!getbyid
router.get("/", async (req,res) => {
    //inputtan gelecek olan userId
    const userId = req.body.userId;
    try {
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;