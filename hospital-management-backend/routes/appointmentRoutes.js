//create the routes for the appointments

const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Routes to handle appointment requests
// GET /api/appointments - get all appointments
// POST /api/appointments - create a new appointment
// GET /api/appointments/:id - get an appointment by id
// PUT /api/appointments/:id - update an appointment by id
// DELETE /api/appointments/:id - delete an appointment by id

router.get('/', appointmentController.getAllAppointments);
router.post('/', appointmentController.createAppointment);
router.get('/:id', appointmentController.getAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;

