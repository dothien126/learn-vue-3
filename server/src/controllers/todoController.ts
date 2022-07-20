import { Request, Response } from 'express';
import { identity } from 'lodash';
import TodoModel from '../models/todoModel';
import UserModel from '../models/userModel';
import { CreateTodoInput, TodoListOfUser } from '../schemas/todoSchema';
import {
  createTodo,
  deleteTodo,
  findTodoById,
  getAllTodo,
  updateTodo,
} from '../services/todoService';

export const createTodoHandler = async (
  req: Request<CreateTodoInput['params'], {}, CreateTodoInput['body']>,
  res: Response
) => {
  try {
    const { userId } = req.params;

    // create a todo
    const data = req.body;
    const todo = await createTodo(data);

    const user = await UserModel.findOne({ userId });
    if (!user) {
      return res.status(404).json('User is not exist');
    }

    // assign todo for user
    todo.user = user;
    await todo.save();

    // add todoList for user
    user.todoList.push(todo._id);
    await user.save();

    return res.status(201).json({ todoList: todo });
  } catch (e: any) {
    return res.status(500).json(e);
  }
};

export const getAllTodoHandler = async (req: Request, res: Response) => {
  try {
    const todo = await getAllTodo();
    if (!todo) {
      return res.status(404).json('Todo is not exist')
    }
    return res.status(200).json(todo)
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllTodoUser = async (req: Request<TodoListOfUser>, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findOne({ userId }).populate('todoList');
    if (!user) {
      return res.status(404).json('User is not exist');
    }

    return res.status(200).json({ ListTodo: user.todoList });
  } catch (e: any) {
    return res.status(500).json(e);
  }
};

export const updateTodoHandler = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const id = req.params.id;

    const updatedTodo = await updateTodo(id, body);
    res.json(updatedTodo);
  } catch (error) {
    res.json({
      success: false,
      message: 'Updating todo failed',
    });
  }
};

export const deleteTodoHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const todo = await deleteTodo(id);
    res.json(todo);
  } catch (error) {
    res.json({
      success: false,
      message: 'Deleting todo failed',
    });
  }
};
