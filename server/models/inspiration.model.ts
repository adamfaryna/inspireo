const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  content: { type: String, required: true },
  source: { type: String, required: true }

}, { timestamps: true });

export const Inspiration = mongoose.model('Inspiration', schema);
