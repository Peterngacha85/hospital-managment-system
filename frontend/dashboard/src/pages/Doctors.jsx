import React, { useEffect, useState } from 'react';
import { getAllDoctors, createDoctor, updateDoctor, deleteDoctor } from '../services/doctorService';
import axios from 'axios'; // Import axios for fetching clinics
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

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]); // State for clinics
  const [open, setOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    clinic_id: '',
  });
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
    fetchClinics(); // Fetch clinics when component mounts
  }, []);

  useEffect(() => {
    // Filter doctors whenever searchQuery changes
    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

  const fetchDoctors = async () => {
    const data = await getAllDoctors();
    setDoctors(data);
  };

  const fetchClinics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clinics');
      setClinics(response.data);
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
  };

  const handleOpen = (doctor = null) => {
    setEditingDoctor(doctor);
    setFormData(doctor ? doctor : { name: '', specialization: '', email: '', phone: '', clinic_id: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDoctor(null);
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.clinic_id) newErrors.clinic_id = 'Clinic is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingDoctor) {
      await updateDoctor(editingDoctor._id, formData);
    } else {
      await createDoctor(formData);
    }
    fetchDoctors();
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteDoctor(id);
    fetchDoctors();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Doctors
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
       <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: 2}}>
        Add Doctor
      </Button>

      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Specialization</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Clinic</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDoctors.map((doctor) => (
              <StyledTableRow key={doctor._id}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>{clinics.find(clinic => clinic._id === doctor.clinic_id)?.name || 'Unknown Clinic'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(doctor)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(doctor._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingDoctor ? 'Edit Doctor' : 'Add Doctor'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="dense"
            name="specialization"
            label="Specialization"
            type="text"
            fullWidth
            value={formData.specialization}
            onChange={handleChange}
            error={!!errors.specialization}
            helperText={errors.specialization}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <FormControl
            fullWidth
            margin="dense"
            error={!!errors.clinic_id}
            variant="outlined"
            sx={{
              '& .MuiInputBase-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.87)', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5', // Border color when focused
                },
              },
            }}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingDoctor ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Doctors;
