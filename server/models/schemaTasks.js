const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  task: {
    type: String,
    required: true
  }
}, { timestamps: true });

const task = mongoose.model('Task')