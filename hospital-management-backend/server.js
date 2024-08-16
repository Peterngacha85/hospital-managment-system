const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes for clinics and patients
app.use('/api/clinics', require('./routes/clinicRoutes'));
// patient routes
app.use('/api/patients', require('./routes/patientRoutes'));
// appointment routes
app.use('/api/appointments', require('./routes/appointmentRoutes'));
// booking routes
app.use('/api/bookings', require('./routes/bookingRoutes'));
// doctor routes
app.use('/api/doctors', require('./routes/doctorRoutes'));
// chronic disease routes
app.use('/api/chronicDiseases', require('./routes/chronicDiseaseRoutes'));
// medicine routes
app.use('/api/medicines', require('./routes/medicineRoutes'));
// patient medicine routes
app.use('/api/patientMedicines', require('./routes/patientMedicineRoutes'));


// Error Handling Middleware
app.use(require('./middleware/errorHandler'));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
