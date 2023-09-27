const express = require('express')
const app = express()

const taskRoutes = require("./taskRoutes");

app.use('/tasks', taskRoutes);

module.exports = app;