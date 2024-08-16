// routes for booking

const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');

// Routes to handle booking requests
// GET /api/bookings - get all bookings
// POST /api/bookings - create a new booking
// GET /api/bookings/:id - get a booking by id
// PUT /api/bookings/:id - update a booking by id
// DELETE /api/bookings/:id - delete a booking by id

router.get('/', bookingController.getAllBookings);
router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBooking);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;

