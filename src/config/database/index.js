import mongoose from "mongoose"
async function connect() {
    try {
        const conn = await mongoose.connect(`${process.env.MONGOSERVER}://${process.env.MONGOHOST}:${process.env.MONGOPORT}/${process.env.MONGOCOLLECTION}`, {
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