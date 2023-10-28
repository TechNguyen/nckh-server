import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import Route from './src/routers/index.js'
import db from './src/config/database/index.js'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import appMiddleware from './src/middleware/app.middleware.js'

const hostname = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT || 8081;
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
//Connect to database
db.connect()
//cors
app.use(cors());
app.use(morgan('combined'))
//Route
appMiddleware(app);
Route(app);
//config route
app.listen(port,hostname, () => {
    console.log(`Server start on http://${hostname}:${port}`)
})  