const Category = require("../models/Category");
const express = require("express");
const router = express.Router();

//router üzerineden http işlemlerimi yapabilirim.

//!ekleme yapalım
//veritabanı işlemleri olacağı için async olmak zorunda
//burdaki route http://localhost:5000/api/categories/add-category şeklinde olacak önce server tarafındaki route gelecek.
router.post("/add-category", async (req,res)=>{
    try {
        //clientten inputtan girilen değer req.body olarak algılanır. Girilen değeri yakalayıp await diyerek bu işlemi yaptıktan sonra aşağıya geç diyorum.
        //json() Bu yöntem, sunucudan bir istemciye JSON formatında veri göndermek için kullanılır.
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(200).json("Item added successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

//!getall
router.get("/get-all", async (req,res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
});

//!update
router.put("/update-category", async (req,res)=>{
    try {
        //idye göre güncellenecek olan elemanı bulacak ve req.body yani kullanıcının inputundan gelen veriyi gönderip güncelleyecek.
        await Category.findOneAndUpdate({_id: req.body.categoryId}, req.body);
        res.status(200).json("Item updated successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

//!silme
router.delete("/delete-category", async (req,res)=>{
    try {
        //sadece kullanıcının gönderdiği ıd yi yakalayaıp ilgili kayıdı bulacak.
        await Category.findOneAndDelete({_id: req.body.categoryId});
        res.status(200).json("Item deleted successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;