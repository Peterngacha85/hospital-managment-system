// chronic decease model

const mongoose = require('mongoose');

const chronicDiseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

// Create and export the ChronicDisease model
const ChronicDisease = mongoose.model('ChronicDisease', chronicDiseaseSchema);
module.exports = ChronicDisease;