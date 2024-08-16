const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');

// Routes to handle clinic requests 
// GET /api/clinics - get all clinics
// POST /api/clinics - create a new clinic
// GET /api/clinics/:id - get a clinic by id
// PUT /api/clinics/:id - update a clinic by id
// DELETE /api/clinics/:id - delete a clinic by id
// GET /api/clinics/:id/doctors - get all doctors of a clinic
// POST /api/clinics/:id/doctors - add a doctor to a clinic


router.get('/', clinicController.getAllClinics);
router.post('/', clinicController.createClinic);
router.get('/:id', clinicController.getClinic);
router.put('/:id', clinicController.updateClinic);
router.delete('/:id', clinicController.deleteClinic);
router.get('/:id/doctors', clinicController.getClinicDoctors);
router.post('/:id/doctors', clinicController.addDoctorToClinic);


module.exports = router;
