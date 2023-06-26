const Bill = require("../models/Bill");
const express = require("express");
const router = express.Router();

//router üzerineden http işlemlerimi yapabilirim.

//!ekleme yapalım
//veritabanı işlemleri olacağı için async olmak zorunda
//burdaki route http://localhost:5000/api/categories/add-Bill şeklinde olacak önce server tarafındaki route gelecek.
router.post("/add-bill", async (req,res)=>{
    try {
        //clientten inputtan girilen değer req.body olarak algılanır. Girilen değeri yakalayıp await diyerek bu işlemi yaptıktan sonra aşağıya geç diyorum.
        //json() Bu yöntem, sunucudan bir istemciye JSON formatında veri göndermek için kullanılır.
        const newBill = new Bill(req.body);
        await newBill.save();
        res.status(200).json("Item added successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

//!getall
router.get("/get-all", async (req,res) => {
    try {
        const bills = await Bill.find();
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;