const Task = require("../models/taskModel");
const recordsPerPage = require("../config/pagination");
const getMonth = require("../util/getMonth");
const pipeline = require("../util/pipeline");

//API to get all tasks, make API paginated
//http://localhost:3000/api/tasks?pageNum=1
const getTasks = async (req, res, next) => {
    try {
        //pagination
        const pageNum = Number(req.query.pageNum) || 1;
        const tasks = await Task.find()
            .skip(recordsPerPage * (pageNum - 1))
            .limit(recordsPerPage);

        res.json({
            pageNum,
            tasks
        });
    } catch (error) {
        next(error);
    }
}

//API to get task by id
const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id).orFail();

        res.json(task);
    }
    catch (error) {
        next(error);
    }
}

//API to get task metrics like counts tasks on basis of status and timeline
const getMetrics = async (req, res, next) => {
    try {
        const open_tasks = await Task.countDocuments({ status: "open" });
    const inprogress_tasks = await Task.countDocuments({ status: "inprogress" });
    const completed_tasks = await Task.countDocuments({ status: "completed" });
    const open_monthWise = await Task.aggregate(pipeline("open"));
    const inprogress_monthWise = await Task.aggregate(pipeline("inprogress"));
    const completed_monthWise = await Task.aggregate(pipeline("completed"));



        const overall = {
        open_tasks,
        inprogress_tasks,
        completed_tasks,
    };

    const map = new Map();

    for (let i = 0; i < open_monthWise.length; i++) {
        const { _id, total } = open_monthWise[i];
        const date = getMonth[_id.month] + " " + _id.year;
        const newVal = {
            open_tasks: total,
            inprogress_tasks: 0,
            completed_tasks: 0,
        };
        map.set(date, newVal);
    }

    for (let i = 0; i < inprogress_monthWise.length; i++) {
        const { _id, total } = inprogress_monthWise[i];
        const date = getMonth[_id.month] + " " + _id.year;
        let newVal = {
            open_tasks: 0,
            inprogress_tasks: total,
            completed_tasks: 0,
        };
        if (map.has(date)) {
            const currVal = map.get(date);
            newVal = { ...currVal, inprogress_tasks: total };

        }

        map.set(date, newVal);
    }

    for (let i = 0; i < completed_monthWise.length; i++) {
        const { _id, total } = completed_monthWise[i];
        const date = getMonth[_id.month] + " " + _id.year;
        let newVal = {
            open_tasks: 0,
            inprogress_tasks: total,
            completed_tasks: 0,
        };
        if (map.has(date)) {
            const currVal = map.get(date);
            newVal = { ...currVal, completed_tasks: total };

        }

        map.set(date, newVal);
    }
        let monthlyRecords = [];

        for (let key of map.keys()) {
            monthlyRecords.push({
                date: key,
                metrics: map.get(key),
            })
        }

        res.json({
            overall,
            monthlyRecords
        });
    }
    catch (error) {
        next(error);
    }
}

//API to create a task
const addTask = async (req, res, next) => {
    try {
        const task = new Task();
        const { name, description, status } = req.body;
        task.name = name;
        task.description = description;
        if (status) {
            task.status = status;
        }
        await task.save();

        res.json({
            message: "task created",
            taskId: task._id,
        });
    }
    catch (error) {
        next(error);
    }
}


//API to update a task
const updateTask = async (req, res, next) => {
    try {
        const { id, name, description, status } = req.body;
        const task = await Task.findById(id).orFail();
        task.name = name || task.name;
        task.description = description || task.description;
        task.status = status || task.status;

        await task.save();
        res.json({
            message: "task updated",
        });
    } catch (err) {
        next(err);
    }
}



module.exports = {
    getTasks,
    getMetrics,
    getTaskById,
    addTask,
    updateTask,
}