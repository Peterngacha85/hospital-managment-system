// pacientmedicine controller

const mongoose = require('mongoose');
const PatientMedicine = require('../models/patientMedicineModel');

// Get all patient medicines

exports.getAllPatientMedicines = async (req, res) => {
    try {
        const patientMedicines = await PatientMedicine.find();
        res.status(200).json(patientMedicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a patient medicine by ID

exports.getPatientMedicine = async (req, res) => {
    try {
        const patientMedicine = await PatientMedicine.findById(req.params.id);
        if (patientMedicine) {
            res.status(200).json(patientMedicine);
        } else {
            res.status(404).json({ message: 'Patient medicine not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new patient medicine

exports.createPatientMedicine = async (req, res) => {
    const { patient_id, medicine_id, prescription_date, dose } = req.body;
    const patientMedicine = new PatientMedicine({ patient_id, medicine_id, prescription_date, dose });
    try {
        const createdPatientMedicine = await patientMedicine.save();
        res.status(201).json(createdPatientMedicine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a patient medicine

exports.updatePatientMedicine = async (req, res) => {   
    const { patient_id, medicine_id, prescription_date, dose } = req.body;
    try {
        const patientMedicine = await PatientMedicine.findById(req.params.id);
        if (patientMedicine) {
            patientMedicine.patient_id = patient_id || patientMedicine.patient_id;
            patientMedicine.medicine_id = medicine_id || patientMedicine.medicine_id;
            patientMedicine.prescription_date = prescription_date || patientMedicine.prescription_date;
            patientMedicine.dose = dose || patientMedicine.dose;
            const updatedPatientMedicine = await patientMedicine.save();
            res.status(200).json(updatedPatientMedicine);
        } else {
            res.status(404).json({ message: 'Patient medicine not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a patient medicine

exports.deletePatientMedicine = async (req, res) => {
    try {
        const patientMedicine = await PatientMedicine.findById(req.params.id);
        if (patientMedicine) {
            await patientMedicine.remove();
            res.status(204).json({ message: 'Patient medicine removed' });
        } else {
            res.status(404).json({ message: 'Patient medicine not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all patient medicines for a patient

exports.getPatientMedicines = async (req, res) => {
    try {
        const patientMedicines = await PatientMedicine.find({ patient_id: req.params.id });
        res.status(200).json(patientMedicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all patient medicines for a medicine

exports.getMedicinePatients = async (req, res) => {
    try {
        const medicinePatients = await PatientMedicine.find({ medicine_id: req.params.id });
        res.status(200).json(medicinePatients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all patient medicines for a patient and medicine

exports.getPatientMedicineByPatientAndMedicine = async (req, res) => {
    try {
        const patientMedicine = await PatientMedicine.find({ patient_id: req.params.patient_id, medicine_id: req.params.medicine_id });
        res.status(200).json(patientMedicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all patient medicines for a patient and medicine

exports.getPatientMedicineByPatientAndMedicine = async (req, res) => {
    try {
        const patientMedicine = await PatientMedicine.find({ patient_id: req.params.patient_id, medicine_id: req.params.medicine_id });
        res.status(200).json(patientMedicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all patient medicines for a patient and prescription date

exports.getPatientMedicineByPatientAndPrescriptionDate = async (req, res) => {
    try {
        const patientMedicine = await PatientMedicine.find({ patient_id: req.params.patient_id, prescription_date: req.params.prescription_date });
        res.status(200).json(patientMedicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all patient medicines for a medicine and prescription date

exports.getPatientMedicineByMedicineAndPrescriptionDate = async (req, res) => {
    try {
        const patientMedicine = await PatientMedicine.find({ medicine_id: req.params.medicine_id, prescription_date: req.params.prescription_date });
        res.status(200).json(patientMedicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all patient medicines for a patient, medicine, and prescription date

exports.getPatientMedicineByPatientMedicineAndPrescriptionDate = async (req, res) => {
    try {
        const patientMedicine = await PatientMedicine.find({ patient_id: req.params.patient_id, medicine_id: req.params.medicine_id, prescription_date: req.params.prescription_date });
        res.status(200).json(patientMedicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all patient medicines for a patient, medicine, and dose

exports.getPatientMedicineByPatientMedicineAndDose = async (req, res) => {
    try {
        const patientMedicine = await PatientMedicine.find({ patient_id: req.params.patient_id, medicine_id: req.params.medicine_id, dose: req.params.dose });
        res.status(200).json(patientMedicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all patient medicines for a patient, medicine, prescription date, and dose

exports.getPatientMedicineByPatientMedicinePrescriptionDateAndDose = async (req, res) => {
    try {
        const patientMedicine = await PatientMedicine.find({ patient_id: req.params.patient_id, medicine_id: req.params.medicine_id, prescription_date: req.params.prescription_date, dose: req.params.dose });
        res.status(200).json(patientMedicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



