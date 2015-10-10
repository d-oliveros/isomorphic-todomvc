import mongoose, { Schema } from 'mongoose';

let schema = new Schema({
  text:   { type: String, required: true },
  marked: { type: Boolean, default: false }
});

let model = mongoose.model('Todo', schema);

export default model;
