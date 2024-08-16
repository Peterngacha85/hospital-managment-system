// pacient medicine model

const mongoose = require('mongoose');

// Patient Medicine Schema (Junction collection for prescriptions)
const patientMedicineSchema = new mongoose.Schema({
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    medicine_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true
    },
    prescription_date: {
      type: Date,
      required: true
    },
    dose: {
      type: String,
      required: true
    }
  });

// Create and export the PatientMedicine model
const PatientMedicine = mongoose.model('PatientMedicine', patientMedicineSchema);
module.exports = PatientMedicine;