// booking controller
const Booking = require('../models/bookingModel');
const asyncHandler = require('express-async-handler');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// @desc    Get a booking by id
// @route   GET /api/bookings/:id
// @access  Public
const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = asyncHandler(async (req, res) => {
  const { patient_id, doctor_id, clinic_id, booking_date, status } = req.body;

  const booking = new Booking({
    patient_id,
    doctor_id,
    clinic_id,
    booking_date,
    status
  });

  const createdBooking = await booking.save();
  res.status(201).json(createdBooking);
});

// @desc    Update a booking
// @route   PUT /api/bookings/:id
// @access  Public
const updateBooking = asyncHandler(async (req, res) => {
  const { patient_id, doctor_id, clinic_id, booking_date, status } = req.body;
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    booking.patient_id = patient_id;
    booking.doctor_id = doctor_id;
    booking.clinic_id = clinic_id;
    booking.booking_date = booking_date;
    booking.status = status;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

const deleteBooking = asyncHandler(async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      await booking.remove();
      res.json({ message: 'Booking removed' });
    } else {
      res.status(404);
      throw new Error('Booking not found');
    }
  } catch (error) {
    console.error('Error deleting booking:', error); // Log the error
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = {  
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking
};
