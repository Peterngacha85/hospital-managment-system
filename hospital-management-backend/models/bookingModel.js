//booking model
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },
    clinic_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clinic',
      required: true
    },
    booking_date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Confirmed', 'Cancelled']
    }
  });

// Create and export the bookingSchema
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;

  