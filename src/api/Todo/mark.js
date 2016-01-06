import { Todo } from '../../models';

export default async function markTodo(todoId, marked) {
  return await Todo.update({ _id: todoId }, { marked });
}
