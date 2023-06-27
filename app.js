import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import router from "./routes/cashier.js";

dotenv.config()
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/shm-cashier', router)

dbConnect().then(
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server running on http://localhost:3000")
    })
)