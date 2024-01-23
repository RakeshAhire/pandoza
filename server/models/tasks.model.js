const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending",
        enum: ['pending', 'inProgress', 'completed']
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'users', // this is table name which we need to refer here
        required: true
    },
    isRead: {
        type: Boolean,
        default: false,
      },

}, { timestamps: true })

const TaskModel = model("tasks", taskSchema);

module.exports = { TaskModel }