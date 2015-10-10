import Todo from './index';

export default function deleteTodo(todoId, callback) {
  Todo.remove({ _id: todoId }, callback);
}
