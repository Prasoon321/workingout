require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()
const userroutes = require('./routes/workout')
const USERROUTE = require('./routes/User')
const port = 4000

app.use(express.json())
app.use(cors())
console.log("Before middleware");

console.log("after middleware");
app.get('/', (req, res) => {
    res.send('Hello World!')
})
console.log("before db connection");

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB Connected to the Server")
}).catch((err) => {
    console.error(err)
})
console.log("after db connection");
app.use('/api/workouts', userroutes)
app.use('/api/user', USERROUTE)
app.listen(port, () => {
    console.log(`Example app listening on port : ${port}`)
})