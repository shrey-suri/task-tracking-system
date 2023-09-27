const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: 'open'
    },
}, {
    timestamps: true
})

taskSchema.index();
taskSchema.index({name: "text", description: "text"}, {name: "TextIndex"})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task;