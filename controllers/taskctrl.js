const db = require('../connection/connection');

// Register Task
exports.registerTask = async (req, res) => {
    try {
        if (!req.body || !req.body.title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "User authentication failed" });
        }

        const taskData = {
            title: req.body.title,
            userId: req.user.userId
        };

        const newTask = await db.task.create(taskData);

        res.status(201).json({ taskdata: newTask });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await db.task.findAll({});
        if (!tasks.length) {
            return res.status(404).json({ message: "No tasks found" });
        }
        res.status(200).json({ tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get Single Task
exports.getSingleTask = async (req, res) => {
    try {
        const task = await db.task.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {
        const existingTask = await db.task.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!existingTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        await db.task.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        const updatedTask = await db.task.findOne({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({ task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const task = await db.task.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await db.task.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({ message: "Task deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
