import { Todo } from '../../models';

export default async function editTodo(todoId, edit) {
  return await Todo.update({ _id: todoId }, { text: edit });
}
