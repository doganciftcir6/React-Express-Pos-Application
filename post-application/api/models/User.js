const mongoose = require("mongoose");

//şema oluştur
const UserSchema = mongoose.Schema(
    {
        username:{type: String, require:  true},
        email:{type: String, require:  true},
        password:{type: String, require:  true},
    },
    {timestamps: true}
);

//parantez içine yazılan veritabanına açılacak olan isim.
//yani categories adında bir sözlük tablo açacağım ve bu yukarıdaki şemayı kullansın bana böyle bir model oluştur.
const User = mongoose.model("users",UserSchema);
module.exports = User;