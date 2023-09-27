const mongoose = require("mongoose");
const Task = require("../models/taskModel");

beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://sampleRootUser:E73G1gIlQaHf82Wn@sampletask0.srbp4fd.mongodb.net/task_database?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("Should save task to database", async () => {
    const mockTask = { name: "test task" };
    await Task.create(mockTask);

    const insertedTask = await Task.findOne({ name: "test task" });
    console.log(insertedTask);
    expect(insertedTask.name).toEqual(mockTask.name);
})

test("Should delete task", async () => {
  const task = await Task.findOne({ name: "test task" }).deleteOne();
  expect(task.name).toBeFalsy();
});