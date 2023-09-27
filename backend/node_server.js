require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

const apiRoutes = require("./routes/apiRoutes");
// create application/json parser
const jsonParser = bodyParser.json()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api", jsonParser, apiRoutes);

//Async REST API REQUEST

//mongodb connection
const connectDB = require("./config/db");
connectDB();

//Custom Error MiddleWare

//On Console
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  next(error);
})

//On Web Browser
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})