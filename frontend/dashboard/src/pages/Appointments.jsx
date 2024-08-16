import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  styled
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import axios from 'axios';
import { getAllAppointments, createAppointment, updateAppointment, deleteAppointment } from '../services/appointmentServices';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.default,
  },
}));

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    booking_id: '',
    appointment_date: '',
    status: 'Scheduled',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAppointments();
    fetchBookings();
    fetchPatients();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, searchQuery]);

  const fetchAppointments = async () => {
    const data = await getAllAppointments();
    setAppointments(data);
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const filterAppointments = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = appointments.filter(appointment =>
      appointment.booking_id.toLowerCase().includes(lowercasedQuery) ||
      new Date(appointment.appointment_date).toLocaleDateString().toLowerCase().includes(lowercasedQuery) ||
      appointment.status.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredAppointments(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpen = (appointment = null) => {
    setEditingAppointment(appointment);
    setFormData(appointment ? {
      booking_id: appointment.booking_id,
      appointment_date: appointment.appointment_date.slice(0, 10),
      status: appointment.status,
    } : { booking_id: '', appointment_date: '', status: 'Scheduled' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingAppointment(null);
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.booking_id) newErrors.booking_id = 'Booking ID is required';
    if (!formData.appointment_date) newErrors.appointment_date = 'Appointment Date is required';
    if (!formData.status) newErrors.status = 'Status is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (editingAppointment) {
        await updateAppointment(editingAppointment._id, formData);
      } else {
        await createAppointment(formData);
      }
      fetchAppointments();
      handleClose();
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const getPatientNameByBookingId = (bookingId) => {
    const booking = bookings.find(b => b._id === bookingId);
    if (booking) {
      const patient = patients.find(p => p._id === booking.patient_id);
      return patient ? patient.name : 'Unknown Patient';
    }
    return 'Unknown Patient';
  };

  // Get today's date in YYYY-MM-DD format
  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <IconButton>
              <Search />
            </IconButton>
          ),
        }}
        sx={{ marginTop: 2, marginBottom: 2, width: '100%' }}
      />
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Appointment
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Patient Name</StyledTableCell>
              <StyledTableCell>Appointment Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <StyledTableRow key={appointment._id}>
                <TableCell>{getPatientNameByBookingId(appointment.booking_id)}</TableCell>
                <TableCell>{new Date(appointment.appointment_date).toLocaleDateString()}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(appointment)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(appointment._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingAppointment ? 'Edit Appointment' : 'Add Appointment'}</DialogTitle>
        <DialogContent>
          <FormControl
            fullWidth
            margin="dense"
            error={!!errors.booking_id}
            variant="outlined"
          >
            <InputLabel>Booking</InputLabel>
            <Select
              name="booking_id"
              value={formData.booking_id}
              onChange={handleChange}
              label="Booking"
            >
              {bookings.map((booking) => (
                <MenuItem key={booking._id} value={booking._id}>
                  {getPatientNameByBookingId(booking._id)}
                </MenuItem>
              ))}
            </Select>
            {errors.booking_id && <FormHelperText>{errors.booking_id}</FormHelperText>}
          </FormControl>
          <TextField
            margin="dense"
            name="appointment_date"
            label="Appointment Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.appointment_date}
            onChange={handleChange}
            error={!!errors.appointment_date}
            helperText={errors.appointment_date}
            inputProps={{ min: todayDate }} // Set min date to today
          />
          <FormControl
            fullWidth
            margin="dense"
            error={!!errors.status}
            variant="outlined"
          >
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="Scheduled">Scheduled</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
            {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingAppointment ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Appointments;
