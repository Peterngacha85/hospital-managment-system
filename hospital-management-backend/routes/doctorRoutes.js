//use doctorController to generate the api routes for doctors
// import express and doctorController
const express = require('express');
const doctorController = require('../controllers/doctorController');

// create a new router
const router = express.Router();

// Routes to handle doctor requests
// GET /api/doctors - get all doctors
// POST /api/doctors - create a new doctor
// GET /api/doctors/:id - get a doctor by id
// PUT /api/doctors/:id - update a doctor by id
// DELETE /api/doctors/:id - delete a doctor by id
router.get('/', doctorController.getAllDoctors);
router.post('/', doctorController.createDoctor);
router.get('/:id', doctorController.getDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
