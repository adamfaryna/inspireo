const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true }
}, { timestamps: true });

export const User = mongoose.model('User', schema);
