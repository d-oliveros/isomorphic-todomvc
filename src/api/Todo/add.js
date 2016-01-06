import { Todo } from '../../models';

export default async function addTodo(todo) {
  return await Todo.create({ text: todo });
}
