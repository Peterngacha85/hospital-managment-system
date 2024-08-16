// medicine model

const mongoose = require('mongoose');

// Medicine Schema
const medicineSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    dose: {
      type: String,
      required: true
    }
  });

// Create and export the Medicine model
const Medicine = mongoose.model('Medicine', medicineSchema);
module.exports = Medicine;

