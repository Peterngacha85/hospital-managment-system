//appoinment controller
const Appointment = require('../models/appointmentModel');
const Booking = require('../models/bookingModel');
// const Patient = require('../models/patientModel');
const asyncHandler = require('express-async-handler');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Public
const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

// @desc    Get an appointment by id
// @route   GET /api/appointments/:id
// @access  Public
const getAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    res.json(appointment);
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
});

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Public

const createAppointment = asyncHandler(async (req, res) => {
  const { booking_id, appointment_date, status } = req.body;

  const booking = await Booking .findById(booking_id);  
    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }   
    const appointment = new Appointment({
        booking_id,
        appointment_date,
        status
    });
    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
}   
);

// @desc    Update an appointment
// @route   PUT /api/appointments/:id
// @access  Public
const updateAppointment = asyncHandler(async (req, res) => {
  const { booking_id, appointment_date, status } = req.body;

  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    appointment.booking_id = booking_id;
    appointment.appointment_date = appointment_date;
    appointment.status = status;

    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
})
// @desc    Delete an appointment
// @route   DELETE /api/appointments/:id
// @access  Public  
const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    await appointment.remove();
    res.json({ message: 'Appointment removed' });
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
}); 

module.exports = {  
    getAllAppointments,
    getAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment
    };  


    