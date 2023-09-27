# Task Tracking System

## Overview

This project is a task tracking system designed to help you keep track of your tasks and manage your to-do lists effectively by using API Calls. Whether you're working on personal projects or collaborating with a team, this system can help you stay organized and productive.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Node Modules Used](#node-modules-used)
- [Schemas](#schemas)
- [Usage](#usage)
  - [Creating Tasks](#creating-tasks)
  - [API Calls](#api-calls)
  - [Pagination](#pagination)
- [Testing](#testing)

## Getting Started

### Prerequisites

Before you can run the task tracking system, you'll need the following prerequisites:

- [Node.js](https://nodejs.org/) installed on your system
- [npm](https://www.npmjs.com/) (Node Package Manager) installed
- [MongoDB](https://www.mongodb.com/) installed and running
- [Postman](https://www.postman.com/downloads/) installed and running

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/shrey-suri/task-tracking-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-tracking-system
   ```
   ```bash
   cd backend
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root directory and specify your MongoDB connection string:

   ```
   MONGODB_URI=your_mongodb_connection_string_here
   ```

### Node Modules Used
 1. [Express.js](https://expressjs.com/)
```bash
npm install express --save
```
 2. [MongoDB](https://www.mongodb.com/)
 ```bash
 npm install mongodb
 ```
 3. [Mongoose](https://mongoosejs.com/docs/)
 ```bash
 npm install mongoose --save
 ```
 4. [body-parser](http://expressjs.com/en/resources/middleware/body-parser.html)
 ```bash
 npm install body-parser --save
 ```
 5. [Jest](https://jestjs.io/)
 ```bash
 npm install jest --save-dev
 ```

# Schemas
```
    task {
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
        Creation and Modification dates
    }
```

## Usage

### Creating Tasks

To create a new task, follow these steps:

1. Run the application:
- Dev: 
```bash
npm run server-dev
```
- Production
```bash
npm run server-prod
```

2. Open your web browser and navigate to `http://localhost:3000`, unless another port mentioned in `.env` file 

3. Use `Postman` and navigate to `http://localhost:3000/api/tasks`.

4. Make a `post` request body with the task details, such as the task name, description, status.

5. Click the "Send" button to create the task.

### API Calls

You various API calls are:

- API to create a task: "Post `http://localhost:3000/api/tasks`" (provide request body)
- API to get all tasks, paginated:  "Get `http://localhost:3000/api/tasks?pageNum=n`"
- API to get task by id: "Get `http://localhost:3000/api/tasks/id`" (id needs to be provided)
- API to update a task: "Put `http://localhost:3000/api/tasks`" (provide id in the request body)
- API to get task metrics like counts tasks on basis of status and timeline: "Get `http://localhost:3000/api/tasks/metrics`"

### Pagination

This project includes pagination to help manage large lists of tasks efficiently. The current pagination configuration is: `pagination: 3`. You can modify and try it out. Modify the pagination configuration at: `backend/config/pagination.js`

## Testing

[Jest](https://jestjs.io/) is used for testing in this project. To run the tests, provide the mongoDB url and use the following command:

```bash
npm run test
```

You can create your own tests at: `backend/__tests__/databaseCall.js`