//routes for chronic diseases

const express = require('express');
const router = express.Router();

const chronicDiseaseController = require('../controllers/chronicDiseaseController');

// Routes to handle chronic disease requests
// GET /api/chronicDiseases - get all chronic diseases
// POST /api/chronicDiseases - create a new chronic disease

router.get('/', chronicDiseaseController.getAllChronicDiseases);
router.post('/', chronicDiseaseController.createChronicDisease);
router.get('/:id', chronicDiseaseController.getChronicDiseaseById);
router.put('/:id', chronicDiseaseController.updateChronicDisease);
router.delete('/:id', chronicDiseaseController.deleteChronicDisease);

module.exports = router;