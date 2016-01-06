import { Todo } from '../../models';

export default async function getAllTodos() {
  return await Todo.find({}).lean().exec();
}
