const Product = require("../models/Product");
const express = require("express");
const router = express.Router();

//router üzerineden http işlemlerimi yapabilirim.

//!ekleme yapalım
//veritabanı işlemleri olacağı için async olmak zorunda
//burdaki route http://localhost:5000/api/categories/add-Product şeklinde olacak önce server tarafındaki route gelecek.
router.post("/add-product", async (req,res)=>{
    try {
        //clientten inputtan girilen değer req.body olarak algılanır. Girilen değeri yakalayıp await diyerek bu işlemi yaptıktan sonra aşağıya geç diyorum.
        //json() Bu yöntem, sunucudan bir istemciye JSON formatında veri göndermek için kullanılır.
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json("Item added successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

//!getall
router.get("/get-all", async (req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});

//!update
router.put("/update-product", async (req,res)=>{
    try {
        //idye göre güncellenecek olan elemanı bulacak ve req.body yani kullanıcının inputundan gelen veriyi gönderip güncelleyecek.
        await Product.findOneAndUpdate({_id: req.body.productId}, req.body);
        res.status(200).json("Item updated successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

//!silme
router.delete("/delete-product", async (req,res)=>{
    try {
        //sadece kullanıcının gönderdiği ıd yi yakalayaıp ilgili kayıdı bulacak.
        await Product.findOneAndDelete({_id: req.body.productId});
        res.status(200).json("Item deleted successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;