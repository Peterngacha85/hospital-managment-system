const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Routes to handle patient requests
// GET /api/patients - get all patients
// POST /api/patients - create a new patient
// GET /api/patients/:id - get a patient by id
// PUT /api/patients/:id - update a patient by id
// DELETE /api/patients/:id - delete a patient by id
// GET /api/patients/:id/appointments - get all appointments of a patient
// POST /api/patients/:id/appointments - add an appointment to a patient

router.get('/', patientController.getAllPatients);
router.post('/', patientController.createPatient);
router.get('/:id', patientController.getPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);
router.get('/:id/appointments', patientController.getPatientAppointments);
router.post('/:id/appointments', patientController.addAppointmentToPatient);

module.exports = router;