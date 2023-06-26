const mongoose = require("mongoose");

//şema oluştur
const ProductSchema = mongoose.Schema(
    {
        title:{type: String, require:  true},
        img:{type: String, require:  true},
        price:{type: Number, require:  true},
        //bunu relationship ile yapabilirdik.
        category:{type: String, require:  true},
    },
    {timestamps: true}
);

//parantez içine yazılan veritabanına açılacak olan isim.
//yani products adında bir sözlük tablo açacağım ve bu yukarıdaki şemayı kullansın bana böyle bir model oluştur.
const Product = mongoose.model("products",ProductSchema);
module.exports = Product;