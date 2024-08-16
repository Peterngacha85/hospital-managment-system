import React, { useState, useEffect } from 'react';
import { getAllPatients, createPatient, updatePatient, deletePatient } from '../services/patientServices';
import axios from 'axios';
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
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.default,
  },
}));

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [chronicDiseases, setChronicDiseases] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    chronic_disease_id: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchPatients();
    fetchChronicDiseases();
  }, []);

  useEffect(() => {
    filterPatients();
  }, [patients, searchQuery]);

  const fetchPatients = async () => {
    const data = await getAllPatients();
    setPatients(data);
  };

  const fetchChronicDiseases = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/chronicDiseases');
      setChronicDiseases(response.data);
    } catch (error) {
      console.error('Error fetching chronic diseases:', error);
    }
  };

  const filterPatients = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(lowercasedQuery) ||
      patient.dob.includes(lowercasedQuery) ||
      patient.gender.toLowerCase().includes(lowercasedQuery) ||
      patient.phone.includes(lowercasedQuery) ||
      patient.email.toLowerCase().includes(lowercasedQuery) ||
      chronicDiseases.find(disease => disease._id === patient.chronic_disease_id)?.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredPatients(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpen = (patient = null) => {
    setEditingPatient(patient);
    setFormData(patient ? {
      name: patient.name,
      dob: patient.dob.slice(0, 10), // Format date for input
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      chronic_disease_id: patient.chronic_disease_id || '',
    } : { name: '', dob: '', gender: '', phone: '', email: '', chronic_disease_id: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPatient(null);
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.email) newErrors.email = 'Email is required';
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
      if (editingPatient) {
        await updatePatient(editingPatient._id, formData);
      } else {
        await createPatient(formData);
      }
      fetchPatients();
      handleClose();
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      fetchPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Patients
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
        Add Patient
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Date of Birth</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Chronic Disease</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <StyledTableRow key={patient._id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{new Date(patient.dob).toLocaleDateString()}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{chronicDiseases.find(disease => disease._id === patient.chronic_disease_id)?.name || 'No Chronic Disease'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(patient)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(patient._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingPatient ? 'Edit Patient' : 'Add Patient'}</DialogTitle>
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
            name="dob"
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dob}
            onChange={handleChange}
            error={!!errors.dob}
            helperText={errors.dob}
          />
          <FormControl
            fullWidth
            margin="dense"
            error={!!errors.gender}
            variant="outlined"
          >
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
          </FormControl>
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
          <FormControl
            fullWidth
            margin="dense"
            error={!!errors.chronic_disease_id}
            variant="outlined"
          >
            <InputLabel>Chronic Disease</InputLabel>
            <Select
              name="chronic_disease_id"
              value={formData.chronic_disease_id}
              onChange={handleChange}
              label="Chronic Disease"
            >
              {chronicDiseases.map((disease) => (
                <MenuItem key={disease._id} value={disease._id}>
                  {disease.name}
                </MenuItem>
              ))}
            </Select>
            {errors.chronic_disease_id && <FormHelperText>{errors.chronic_disease_id}</FormHelperText>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingPatient ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Patients;
