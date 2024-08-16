import React, { useEffect, useState } from 'react';
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
import {
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getAllDoctors,
  getAllPatients,
  getAllClinics
} from '../services/bookingServices'; // Updated import

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.common.white,
  fontWeight: 'bold',
  position: 'sticky',
  top: 0,
  zIndex: 1,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.default,
  },
}));

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    clinic_id: '',
    booking_date: '',
    status: 'Pending'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchBookings();
    fetchDoctors();
    fetchPatients();
    fetchClinics();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchQuery]);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const data = await getAllDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchClinics = async () => {
    try {
      const data = await getAllClinics();
      setClinics(data);
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
  };

  const filterBookings = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = bookings.filter(booking => {
      const patientName = patients.find(patient => patient._id === booking.patient_id)?.name.toLowerCase() || '';
      const doctorName = doctors.find(doctor => doctor._id === booking.doctor_id)?.name.toLowerCase() || '';
      const clinicName = clinics.find(clinic => clinic._id === booking.clinic_id)?.name.toLowerCase() || '';
      const bookingDate = new Date(booking.booking_date).toLocaleDateString().toLowerCase();
      const status = booking.status.toLowerCase();

      return (
        patientName.includes(lowercasedQuery) ||
        doctorName.includes(lowercasedQuery) ||
        clinicName.includes(lowercasedQuery) ||
        bookingDate.includes(lowercasedQuery) ||
        status.includes(lowercasedQuery)
      );
    });
    setFilteredBookings(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpen = (booking = null) => {
    setEditingBooking(booking);
    setFormData(booking ? {
      ...booking,
      booking_date: booking.booking_date.slice(0, 10) // Format date for input
    } : { patient_id: '', doctor_id: '', clinic_id: '', booking_date: '', status: 'Pending' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingBooking(null);
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patient_id) newErrors.patient_id = 'Patient is required';
    if (!formData.doctor_id) newErrors.doctor_id = 'Doctor is required';
    if (!formData.clinic_id) newErrors.clinic_id = 'Clinic is required';
    if (!formData.booking_date) newErrors.booking_date = 'Booking date is required';
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

    if (editingBooking) {
      await updateBooking(editingBooking._id, formData);
    } else {
      await createBooking(formData);
    }
    fetchBookings();
    handleClose();
  };

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bookings
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
        Add Booking
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Patient</StyledTableCell>
              <StyledTableCell>Doctor</StyledTableCell>
              <StyledTableCell>Clinic</StyledTableCell>
              <StyledTableCell>Booking Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((booking) => (
              <StyledTableRow key={booking._id}>
                <TableCell>{patients.find(patient => patient._id === booking.patient_id)?.name || 'Unknown Patient'}</TableCell>
                <TableCell>{doctors.find(doctor => doctor._id === booking.doctor_id)?.name || 'Unknown Doctor'}</TableCell>
                <TableCell>{clinics.find(clinic => clinic._id === booking.clinic_id)?.name || 'Unknown Clinic'}</TableCell>
                <TableCell>{new Date(booking.booking_date).toLocaleDateString()}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(booking)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(booking._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingBooking ? 'Edit Booking' : 'Add Booking'}</DialogTitle>
        <DialogContent>
          <FormControl
            fullWidth
            margin="dense"
            error={!!errors.patient_id}
            variant="outlined"
          >
            <InputLabel>Patient</InputLabel>
            <Select
              name="patient_id"
              value={formData.patient_id}
              onChange={handleChange}
              label="Patient"
            >
              {patients.map((patient) => (
                <MenuItem key={patient._id} value={patient._id}>
                  {patient.name}
                </MenuItem>
              ))}
            </Select>
            {errors.patient_id && <FormHelperText>{errors.patient_id}</FormHelperText>}
          </FormControl>
          <FormControl
            fullWidth
            margin="dense"
            error={!!errors.doctor_id}
            variant="outlined"
          >
            <InputLabel>Doctor</InputLabel>
            <Select
              name="doctor_id"
              value={formData.doctor_id}
              onChange={handleChange}
              label="Doctor"
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </MenuItem>
              ))}
            </Select>
            {errors.doctor_id && <FormHelperText>{errors.doctor_id}</FormHelperText>}
          </FormControl>
          <FormControl
            fullWidth
            margin="dense"
            error={!!errors.clinic_id}
            variant="outlined"
          >
            <InputLabel>Clinic</InputLabel>
            <Select
              name="clinic_id"
              value={formData.clinic_id}
              onChange={handleChange}
              label="Clinic"
            >
              {clinics.map((clinic) => (
                <MenuItem key={clinic._id} value={clinic._id}>
                  {clinic.name}
                </MenuItem>
              ))}
            </Select>
            {errors.clinic_id && <FormHelperText>{errors.clinic_id}</FormHelperText>}
          </FormControl>
          <TextField
            margin="dense"
            name="booking_date"
            label="Booking Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.booking_date}
            onChange={handleChange}
            error={!!errors.booking_date}
            helperText={errors.booking_date}
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
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
            {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingBooking ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Bookings;
