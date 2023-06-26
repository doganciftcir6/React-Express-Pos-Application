const mongoose = require("mongoose");

//şema oluştur
const CategorySchema = mongoose.Schema(
    {
        title:{type: String, require:  true},
    },
    {timestamps: true}
);

//parantez içine yazılan veritabanına açılacak olan isim.
//yani categories adında bir sözlük tablo açacağım ve bu yukarıdaki şemayı kullansın bana böyle bir model oluştur.
const Category = mongoose.model("categories",CategorySchema);
module.exports = Category;