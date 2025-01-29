const mongoose = require('mongoose');

const MembersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,  // Make sure username is required
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure email is unique
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",  // You can set a default role, or modify it later
    },
});

const MembersModel = mongoose.model("Members", MembersSchema);
module.exports = MembersModel;
