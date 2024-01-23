const { Router } = require("express");
const { getAllUser, getSingleUser, updateUser, deleteUser } = require("../controllers/user");
const { verifyAdmin } = require("../utils/verifyTokens");

const UserRouter = Router();

UserRouter.get("/getall", getAllUser);
UserRouter.get("/singleuser/:id", verifyAdmin, getSingleUser);
UserRouter.put("/update/:id", verifyAdmin, updateUser);
UserRouter.delete("/delete/:id", verifyAdmin, deleteUser);

module.exports = { UserRouter }