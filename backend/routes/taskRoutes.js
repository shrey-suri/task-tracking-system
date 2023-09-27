const express = require('express')
const router = express.Router()
const { getTasks, getMetrics, getTaskById,  addTask, updateTask } = require("../controllers/TaskController");

//Get Routes
router.get('/', getTasks);
router.get("/metrics", getMetrics);
router.get("/get-one/:id", getTaskById)

//Add or Post Routes
router.post("/", addTask)

//Update task
router.put("/", updateTask);

module.exports = router