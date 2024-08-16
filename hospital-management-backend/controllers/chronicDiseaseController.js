// chronic disease controller


const ChronicDisease = require('../models/chronicDiseaseModel');
const asyncHandler = require('express-async-handler');

// @desc    Get all chronic diseases
// @route   GET /api/chronicDiseases
// @access  Public

const getAllChronicDiseases = asyncHandler(async (req, res) => {
    const chronicDiseases = await ChronicDisease.find();
    res.json(chronicDiseases);
    }
);

// @desc    Get a chronic disease by id
// @route   GET /api/chronicDiseases/:id
// @access  Public

const getChronicDiseaseById = asyncHandler(async (req, res) => {
    const chronicDisease = await ChronicDisease.findById(req.params.id);
    if (chronicDisease) {
        res.json(chronicDisease);
    } else {
        res.status(404);
        throw new Error('Chronic Disease not found');
    }
}); 

// @desc    Create a new chronic disease
// @route   POST /api/chronicDiseases
// @access  Public

const createChronicDisease = asyncHandler(async (req, res) => { 
    const { name, description } = req.body;

    if (!name) {
        res.status(400);
        throw new Error('Name is required');
    }

    const chronicDisease = new ChronicDisease({
        name,
        description
    });

    const createdChronicDisease = await chronicDisease.save();
    res.status(201).json(createdChronicDisease);
}); 


// @desc    Update a chronic disease
// @route   PUT /api/chronicDiseases/:id
// @access  Public

const updateChronicDisease = asyncHandler(async (req, res) => { 
    const { patient_id, disease_name, diagnosis_date, treatment_plan } = req.body;

    const chronicDisease = await ChronicDisease.findById(req.params.id);

    if (chronicDisease) {
        chronicDisease.patient_id = patient_id;
        chronicDisease.disease_name = disease_name;
        chronicDisease.diagnosis_date = diagnosis_date;
        chronicDisease.treatment_plan = treatment_plan;

        const updatedChronicDisease = await chronicDisease.save();
        res.json(updatedChronicDisease);
    } else {
        res.status(404);
        throw new Error('Chronic Disease not found');
    }
}); 

// @desc    Delete a chronic disease
// @route   DELETE /api/chronicDiseases/:id
// @access  Public

const deleteChronicDisease = asyncHandler(async (req, res) => {
    const chronicDisease = await ChronicDisease.findById(req.params.id);

    if (chronicDisease) {
        await chronicDisease.remove();
        res.json({ message: 'Chronic Disease deleted' });
    } else {
        res.status(404);
        throw new Error('Chronic Disease not found');
    }
});

module.exports = { getAllChronicDiseases, getChronicDiseaseById, createChronicDisease, updateChronicDisease, deleteChronicDisease };
