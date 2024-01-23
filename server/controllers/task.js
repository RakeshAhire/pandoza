const { TaskModel } = require("../models/tasks.model")

const createTask = async (req, res, next) => {
    const { title, employeeId } = req.body
    try {
        const task = new TaskModel({ title, employeeId })
        const savedTask = await task.save();
        res.status(200).json({ savedTask, message: "Task Assigned Successfully !" });
    } catch (error) {
        next(error);
    }
}

const getAllTask = async (req, res, next) => {
    const { id, role } = req.user;
    // console.log('id: ', id, role);
    try {
        let tasks;
        if (role === 'admin') {
            tasks = await TaskModel.find().sort({ createdAt: -1 }).populate("employeeId");
        } else {
            tasks = await TaskModel.find({ employeeId: id }).sort({ createdAt: -1 }).populate("employeeId");
        }
        return res.status(200).json(tasks);
    }
    catch (err) {
        // res.status(500).json(err)
        next(err)
    }
}

const getSingleTask = async (req, res, next) => {
    const { id } = req.params;
    // console.log('id: ', id);
    try {
        const task = await TaskModel.findById(id).populate("assignedUser");
        res.status(200).json(task);
    }
    catch (err) {
        next(err)
    }
}

const updateTask = async (req, res, next) => {
    const { id } = req.params;
    // console.log('id: ', id);
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, { $set: req.body }, { new: true }).populate("employeeId");
        res.status(200).json({ updatedTask, message: "Task has been Updated Successfully !" })
    }
    catch (err) {
        next(err)
    }
}

const deleteTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        await TaskModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Task has been deleted" })
    }
    catch (err) {
        next(err)
    }
}
const unreadTask = async (req, res, next) => {
    const { id, role } = req.user;
    try {
        const unreadTasks = await TaskModel.find({
            isRead: false, employeeId: id
        }).populate("employeeId");
        res.status(200).json(unreadTasks)
    }
    catch (err) {
        next(err)
    }
}

module.exports = { createTask, getAllTask, getSingleTask, updateTask, deleteTask, unreadTask }
