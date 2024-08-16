// Appointment Schema
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true
    },
    appointment_date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['Scheduled', 'Completed', 'No-Show']
    }
  });

// Create and export the appointmentSchema
const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
