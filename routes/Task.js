const express = require('express');
const router = express.Router();
const taskCtrl = require("../controllers/taskctrl");
const authenticateToken = require('../auth/authenticateToken');


//add task
router.post("/tasks", authenticateToken, taskCtrl.registerTask);

//Fetch all tasks.
router.get("/tasks", authenticateToken, taskCtrl.getAllTasks);

// Fetch a single task by its ID.
router.get("/tasks/:id", authenticateToken, taskCtrl.getSingleTask);

router.put("/tasks/:id", authenticateToken, taskCtrl.updateTask);

router.delete("/tasks/:id", authenticateToken, taskCtrl.deleteTask);

module.exports = router;