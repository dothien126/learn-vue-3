import TodoModel, { Todo } from '../models/todoModel';
import UserModel from '../models/userModel';

export function createTodo(input: Partial<Todo>) {
  return TodoModel.create(input);
}

export function getAllTodo() {
  return TodoModel.find({});
}

export async function findTodoById(id: string) {
  const todo = await TodoModel.findById(id);
  if (todo) {
    return todo;
  } else {
    return 'Todo is not exist!';
  }
}
export async function updateTodo(id: string, body: any) {
  try {
    const updateTodo = await TodoModel.findByIdAndUpdate(
      id,
      {
        $set: body,
      },
      { new: true }
    );
    return {
      success: true,
      data: updateTodo,
      message: 'Updated todo successfully',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Error while updating this todo',
    };
  }
}

export async function deleteTodo(id: string) {
  try {
    const todo = await TodoModel.findByIdAndDelete(id);
    return {
      success: true,
      data: todo,
      message: 'Deleted todo successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error while deleting this todo',
    };
  }
}
