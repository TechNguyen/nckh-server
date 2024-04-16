import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import Route from './src/routers/index.js'
import db from './src/config/database/index.js'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import appMiddleware from './src/middleware/app.middleware.js'
import path from 'path'
import { fileURLToPath } from 'url'
const hostname = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT || 8081;
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import  {Server}  from "socket.io";
import http from 'http';

// const httpServer = http.createServer(app);
// const io = new Server(httpServer, {
//     cors: {
//       origin: "http://localhost:3302",
//       methods: ["GET", "POST"],
//     },
//   });
//   io.on("connection", (socket) => {
//     console.log('a user connected',socket.id);
//     socket.on('send_message', (data) => {
//     console.log('check data cai ha',data);
//     socket.on("connect_error", (err) => {
//       console.log(`connect_error due to ${err.message}`);
//     });
//   });

//   });
//   httpServer.listen(3301)
app.use(bodyParser.json());

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
//static file
app.use(express.static(path.join(__dirname,'public')));

//config route
app.listen(port,hostname, () => {
    console.log(`Server start on http://${hostname}:${port}`)
})  