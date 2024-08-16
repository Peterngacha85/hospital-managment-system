// medicineRoutes.js

const express = require('express');
const medicineController = require('../controllers/medicineController');

const router = express.Router();

// Routes to handle medicine requests
router.route('/')
    .get(medicineController.getAllMedicines)
    .post(medicineController.createMedicine); // route to get all medicines and create a new medicine

router.route('/:id')
    .get(medicineController.getMedicine)
    .patch(medicineController.updateMedicine) // route to update a medicine
    .delete(medicineController.deleteMedicine); // route to delete a medicine by ID

module.exports = router;
