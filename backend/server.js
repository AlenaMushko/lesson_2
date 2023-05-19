const express= require("express");
const dotenv = require("dotenv");
const path = require("path");
require("colors");
const connectDb = require("../config/db");

const configPath = path.join(__dirname,  "..", "config", ".env");
dotenv.config({path: configPath});

const app = express();
app.use(express.urlencoded({extended: false})) // обробляти форми
app.use(express.json()) // як і app.use(express.urlencoded({extended: false})), але для json

app.use("/api/v1", require("./routes/moviesRouter")) //вказуємо що будемо виконувати і де всі роути прописані

app.use("*", (req, res, next)=>{ //якщо невірна адреса
res.status(404);
res.json({
    code: 404,
    message : "not found",
});
next();
})

app.use((error, req, res, next)=>{
    const statusCode = res.statusCode || 500;
    const mode = process.env.NODE_ENV === "production" ? null:error.stack;
res.status(statusCode)
res.json({
    code:statusCode,
    stack: mode,
    // serverMode:process.env.NODE_ENV
})
    // console.log(error.stack);
    // console.log(res.statusCode);
})


connectDb();
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`.green.bold.italic);
})


