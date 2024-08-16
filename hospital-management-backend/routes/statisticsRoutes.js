// routes/statisticsRoutes.js
const express = require('express');
const router = express.Router();

// Dummy data for illustration purposes
router.get('/statistics', async (req, res) => {
  try {
    // Example statistics
    const stats = {
      totalPatients: 120,
      totalDoctors: 30,
      totalAppointments: 300,
      totalBookings: 150,
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics' });
  }
});

module.exports = router;
