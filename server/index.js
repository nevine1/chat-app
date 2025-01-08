const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const router = express.Router();
require('dotenv').config();

app.use(cors());

app.use(express.json()); // this middleware allows to use json with req, res data
//app.use(cors()); //it enables the server to communicate with front end
const routeOfUsers = require('./routes/userRoute')
const routeOfChats = require('./routes/chatRoute')
const routeOfMessages = require('./routes/messageRoute')

/* router.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    next();
}); */
//user router
app.use("/api/users", routeOfUsers);
app.use("/api/chats", routeOfChats);
app.use("/api/messages", routeOfMessages);

const port = process.env.PORT

const uri = process.env.MONGODB_URL;
app.listen(port, () =>{
    console.log(`Server is running on port #: ${port}`)
})

mongoose.connect(uri)
.then(()=> console.log("connection established successfully"))
.catch((err) =>console.log("failed to connect to monogodb because: ", err.message))