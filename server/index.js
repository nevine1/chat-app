const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

app.use(express.json()); // this middleware allows to use json with req, res data
app.use(cors()); //it enables the server to communicate with front end


const port = process.env.PORT
const uri = process.env.MONGODB_URL;
app.listen(port, () =>{
    console.log(`Server is running on port #: ${port}`)
})

mongoose.connect(uri)
.then(()=> console.log("connection established successfully"))
.catch((err) =>console.log("failed to connect to monogodb", err.message))