const mongoose = require("mongoose");

//şema oluştur
const BillSchema = mongoose.Schema(
    {
        customerName:{type: String, require:  true},
        customerPhoneNumber:{type: String, require:  true},
        paymentMode:{type: String, require:  true},
        cartItems:{type: Array, require:  true},
        subTotal:{type: Number, require:  true},
        tax:{type: Number, require:  true},
        totalAmount:{type: Number, require:  true},
    },
    {timestamps: true}
);

//parantez içine yazılan veritabanına açılacak olan isim.
//yani categories adında bir sözlük tablo açacağım ve bu yukarıdaki şemayı kullansın bana böyle bir model oluştur.
const Bill = mongoose.model("bills",BillSchema);
module.exports = Bill;