import mongoose from "mongoose"
async function connect() {
    try {
        const conn = await mongoose.connect('mongodb+srv://cuongcntt04:vomanhcuong0612@cuong.9ew8xw0.mongodb.net/?retryWrites=true&w=majority&appName=cuong', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Connected to database ${conn.connection.port}`)
    } catch (err) {
        console.log(`Error ${err.message}`)
    }
}
export default {
    connect
}