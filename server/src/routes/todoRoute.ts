import express from 'express';

import {
  createTodoHandler,
  getAllTodoUser,
  updateTodoHandler,
  deleteTodoHandler,
  getAllTodoHandler,
} from '../controllers/todoController';
import validate from '../middleware/validate';
import { createTodoSchema, todoListOfUser } from '../schemas/todoSchema';

const router = express.Router();

router.post('/api/todo/create/:userId', validate(createTodoSchema), createTodoHandler);
router.get('/api/todo', getAllTodoHandler);
router.get('/api/todo/:userId', validate(todoListOfUser), getAllTodoUser);
router.put('/api/todo/update/:id', updateTodoHandler);
router.delete('/api/todo/delete/:id', deleteTodoHandler);

export default router;
