const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'employee']
    }
}, { timestamps: true })

const UserModel = model("users", userSchema);

module.exports = { UserModel };