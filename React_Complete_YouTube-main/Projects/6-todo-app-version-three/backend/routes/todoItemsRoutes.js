const express = require("express");
const todoItemRouter = express.Router();

const todoItemController = require("../Controllers/TodoItemsController");

todoItemRouter.get("/",todoItemController.getTodoItems);
todoItemRouter.post("/",todoItemController.createTodoItem);
todoItemRouter.delete("/:id",todoItemController.deleteTodoItem);
todoItemRouter.put("/:id/completed",todoItemController.getCompleted);


module.exports = todoItemRouter;