import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect;