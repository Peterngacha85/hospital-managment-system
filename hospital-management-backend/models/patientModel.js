const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    chronic_disease_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChronicDisease',
        required: false
    }
});

// Create and export the Patient model
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
