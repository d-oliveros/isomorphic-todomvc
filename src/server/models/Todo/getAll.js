import Todo from './index';

export default function getAllTodos(callback) {
  Todo.find({}).sort({ _id: -1 }).exec(callback);
}
