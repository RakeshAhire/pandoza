const Router = require("express");
const { createTask, deleteTask, getAllTask, getSingleTask, updateTask, unreadTask } = require("../controllers/task");
const { verifyUser, verifyAdmin } = require("../utils/verifyTokens");

const TaskRouter = Router();

TaskRouter.post("/create", verifyAdmin, createTask);
TaskRouter.get("/getall", verifyUser, getAllTask);
TaskRouter.get("/getsingle/:id", getSingleTask);
TaskRouter.put("/update/:id", verifyUser, updateTask);
TaskRouter.delete("/delete/:id", verifyAdmin, deleteTask);
TaskRouter.get("/unreadtasks", verifyUser, unreadTask);

module.exports = { TaskRouter };
