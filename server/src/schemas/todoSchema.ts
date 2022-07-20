import { object, string, TypeOf } from 'zod';

export const createTodoSchema = object({
  params: object({
    userId: string(),
  }),
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    content: string({
      required_error: 'Content is required',
    }),
  }),
});

export const todoListOfUser = object({
  params: object({
    userId: string(),
  }),
});

export type CreateTodoInput = TypeOf<typeof createTodoSchema>;

export type TodoListOfUser = TypeOf<typeof todoListOfUser>['params'];
