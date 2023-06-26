const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");
const categoryRoute = require("./routes/categories");
const productRoute = require("./routes/products");
const billRoute = require("./routes/bills");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

const app = express();

const port = 5000;

//env kullanmak için
dotenv.config();

//db baglantisi
const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to mongoDb");
    } catch (error) {
        throw error;
    }
}

//middlewears
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/categories",categoryRoute);
app.use("/api/products",productRoute);
app.use("/api/bills",billRoute);
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);

app.listen(port,()=>{
    connect();
    console.log(`Example app listening on port ${port}`);
})