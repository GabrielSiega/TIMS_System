const express = require("express")
const mongoose = require ('mongoose')
const cors = require ("cors")
const MembersModel = require ('./models/Members')

const app = express()
app.use (express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Members")

app.post('/register',(req,  res) => {
    MembersModel.create(req.body)
    .then(Members => res.json (Members))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running")
})