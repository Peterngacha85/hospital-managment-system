

const Patient = require('../models/patientModel');


exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json(patient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        res.json(patient);
    } catch (err) {
        res.status(404).json({ error: 'Patient not found' });
    }
};
exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate (req.params.id , req.body  , {new : true});
        res.json(patient);
    }
    catch (err) {
        res.status(404).json({ error: 'Patient not found' });
    }
}
exports.deletePatient = async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ message: 'Patient deleted' });
    } catch (err) {
        res.status(404).json({ error: 'Patient not found' });
    }
};
exports.getPatientAppointments = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('appointments');
        res.json(patient.appointments);
    } catch (err) {
        res.status(404).json({ error: 'Patient not found' });
    }
};
exports.addAppointmentToPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        patient.appointments.push(req.body.appointmentId);
        await patient.save();
        res.json(patient);
    } catch (err) {
        res.status(404).json({ error: 'Patient not found' });
    }
};





