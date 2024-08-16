// medicineController.js

const Medicine = require('../models/medicineModel');
const asyncHandler = require('express-async-handler');

// Create a new medicine
exports.createMedicine = asyncHandler(async (req, res) => {
    const { name, description, dose } = req.body;
    const medicine = new Medicine({ name, description, dose });
    const createdMedicine = await medicine.save();
    res.status(201).json(createdMedicine);
});

// Get all medicines
exports.getAllMedicines = asyncHandler(async (req, res) => {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
});

// Get a medicine by ID
exports.getMedicine = asyncHandler(async (req, res) => {
    const medicine = await Medicine.findById(req.params.id);
    if (medicine) {
        res.status(200).json(medicine);
    } else {
        res.status(404);
        throw new Error('Medicine not found');
    }
});

// Update a medicine
exports.updateMedicine = asyncHandler(async (req, res) => {
    const { name, description, dose } = req.body;
    const medicine = await Medicine.findById(req.params.id);
    if (medicine) {
        medicine.name = name || medicine.name;
        medicine.description = description || medicine.description;
        medicine.dose = dose || medicine.dose;
        const updatedMedicine = await medicine.save();
        res.status(200).json(updatedMedicine);
    } else {
        res.status(404);
        throw new Error('Medicine not found');
    }
});

// Delete a medicine
exports.deleteMedicine = asyncHandler(async (req, res) => {
    const medicine = await Medicine.findById(req.params.id);
    if (medicine) {
        await medicine.remove();
        res.status(204).json({ message: 'Medicine removed' });
    } else {
        res.status(404);
        throw new Error('Medicine not found');
    }
});
