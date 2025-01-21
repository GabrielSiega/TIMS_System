const mongoose = require('mongoose')

const MembersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:String
})

const MembersModel = mongoose.model("Members", MembersSchema)
module.exports = MembersModel