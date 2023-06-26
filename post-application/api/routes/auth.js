const User = require("../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//router üzerineden http işlemlerimi yapabilirim.

//!register yapalım
//veritabanı işlemleri olacağı için async olmak zorunda
//burdaki route http://localhost:5000/api/categories/add-User şeklinde olacak önce server tarafındaki route gelecek.
router.post("/register", async (req,res)=>{
    try {
        //clientten inputtan girilen değer req.body olarak algılanır. Girilen değeri yakalayıp await diyerek bu işlemi yaptıktan sonra aşağıya geç diyorum.
        //json() Bu yöntem, sunucudan bir istemciye JSON formatında veri göndermek için kullanılır.
        //kullanıcının şifresini dbye kaydetmeden önce bcrypt kullanarak hashleyeceğiz.
        //burdaki veriler req.bodyden yani kullanıcı inputundan gelecek diyoruz.
        const {username, email ,password} = req.body; 
        //uzunluk limiti 10 olsun.
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            username: username,
            email: email,
            password: hashPassword
        });
        await newUser.save();
        res.status(200).json("A new user created successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

//!login
router.post("/login", async (req,res)=>{
    try {
        //dbde kullanıcının girmiş olduğu emaili aratıcaz var mı diye
        const user = await User.findOne({email: req.body.email});
        //kullanıcı yoksa 
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        //kullanıcı bulundu, şimdi hashlenmiş şifreyi çözücez ve dbdekiyle uyuşuyormu diye bakıcaz. İlk parametre kullanıcının inputtan gönderdiği değer ikincisi ise dbdeki.
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!validPassword){
            //eğer şifre yanlışsa uyuşmuyorsa
            res.status(403).json("Invalid password!");
        }else{
            //şifre uyuşuyor
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;