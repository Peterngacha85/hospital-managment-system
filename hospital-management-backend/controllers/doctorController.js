//  doctor controller module
// Path: hospital-management-backend/controllers/doctorController.js
// This module contains functions to handle doctor requests.

const Doctor = require('../models/doctorModel');
const Clinic = require('../models/clinicModel');

// Function to get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to create a new doctor
const createDoctor = async (req, res) => {
    try {
        const clinic = await Clinic.findById(req.body.clinic_id);
        if (!clinic) {
            return res.status(404).json({ message: 'Clinic not found' });
        }
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to get a doctor by id
const getDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update a doctor by id
const updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }   
}

// Function to delete a doctor by id
const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json({ message: 'Doctor deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get all appointments of a doctor
const getDoctorAppointments = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('appointments');
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor.appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to add an appointment to a doctor
const addAppointmentToDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        doctor.appointments.push(req.body.appointmentId);
        await doctor.save();
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllDoctors,
    createDoctor,
    getDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorAppointments,
    addAppointmentToDoctor
};
// Compare this snippet from hospital-management-backend/controllers/clinicController.js: