import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema({
  text:   { type: String, required: true },
  marked: { type: Boolean, default: false },
  editing: { type: Boolean }
});

export const Todo = mongoose.model('Todo', todoSchema);
