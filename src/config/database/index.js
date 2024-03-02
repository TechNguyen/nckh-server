import mongoose from "mongoose"
async function connect() {
    console.log("test",process.env.MONGODB_PORT)
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("hihi");
        console.log(`Connected to database ${conn.connection.port}`)
    } catch (err) {
        console.log(`Error ${err.message}`)
    }
}
export default {
    connect
}