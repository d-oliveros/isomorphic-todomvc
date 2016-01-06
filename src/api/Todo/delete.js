import { Todo } from '../../models';

export default async function deleteTodo(todoId) {
  return await Todo.remove({ _id: todoId });
}
