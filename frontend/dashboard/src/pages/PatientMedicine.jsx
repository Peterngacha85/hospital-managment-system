import React, { useEffect, useState } from 'react';
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

const PatientMedicine = () => {
  const [patientMedicines, setPatientMedicines] = useState([]);
  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingPatientMedicine, setEditingPatientMedicine] = useState(null);
  const [formData, setFormData] = useState({
    patient_id: '',
    medicine_id: '',
    prescription_date: '',
    dose: '',
  });
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatientMedicines, setFilteredPatientMedicines] = useState([]);

  useEffect(() => {
    fetchPatientMedicines();
    fetchPatients();
    fetchMedicines();
  }, []);

  useEffect(() => {
    const filtered = patientMedicines.filter(pm =>
      patients.find(p => p._id === pm.patient_id)?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicines.find(m => m._id === pm.medicine_id)?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPatientMedicines(filtered);
  }, [searchQuery, patientMedicines, patients, medicines]);

  const fetchPatientMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patientMedicines');
      setPatientMedicines(response.data);
    } catch (error) {
      console.error('Error fetching patient medicines:', error);
    } finally {
      setLoading(false);
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

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/medicines');
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  const handleOpen = (patientMedicine = null) => {
    setEditingPatientMedicine(patientMedicine);
    setFormData(patientMedicine ? { ...patientMedicine } : { patient_id: '', medicine_id: '', prescription_date: '', dose: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPatientMedicine(null);
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
    if (!formData.patient_id) newErrors.patient_id = 'Patient ID is required';
    if (!formData.medicine_id) newErrors.medicine_id = 'Medicine ID is required';
    if (!formData.prescription_date) newErrors.prescription_date = 'Prescription Date is required';
    if (!formData.dose) newErrors.dose = 'Dose is required';
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
      if (editingPatientMedicine) {
        await axios.put(`http://localhost:5000/api/patientMedicines/${editingPatientMedicine._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/patientMedicines', formData);
      }
      fetchPatientMedicines();
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/patientMedicines/${id}`);
      fetchPatientMedicines();
    } catch (error) {
      console.error('Error deleting patient medicine:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Patient Medicines
      </Typography>

      <TextField
        variant="outlined"
        placeholder="Search by Patient Name or Medicine Name..."
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
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: 2 }}>
        Add Patient Medicine
      </Button>

      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Patient Name</StyledTableCell>
              <StyledTableCell>Medicine Name</StyledTableCell>
              <StyledTableCell>Prescription Date</StyledTableCell>
              <StyledTableCell>Dose</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatientMedicines.map((pm) => (
              <StyledTableRow key={pm._id}>
                <TableCell>{patients.find(p => p._id === pm.patient_id)?.name || 'Unknown Patient'}</TableCell>
                <TableCell>{medicines.find(m => m._id === pm.medicine_id)?.name || 'Unknown Medicine'}</TableCell>
                <TableCell>{new Date(pm.prescription_date).toLocaleDateString()}</TableCell>
                <TableCell>{pm.dose}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(pm)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(pm._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingPatientMedicine ? 'Edit Patient Medicine' : 'Add Patient Medicine'}</DialogTitle>
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
            error={!!errors.medicine_id}
            variant="outlined"
          >
            <InputLabel>Medicine</InputLabel>
            <Select
              name="medicine_id"
              value={formData.medicine_id}
              onChange={handleChange}
              label="Medicine"
            >
              {medicines.map((medicine) => (
                <MenuItem key={medicine._id} value={medicine._id}>
                  {medicine.name}
                </MenuItem>
              ))}
            </Select>
            {errors.medicine_id && <FormHelperText>{errors.medicine_id}</FormHelperText>}
          </FormControl>
          <TextField
            margin="dense"
            name="prescription_date"
            label="Prescription Date"
            type="date"
            fullWidth
            value={formData.prescription_date}
            onChange={handleChange}
            error={!!errors.prescription_date}
            helperText={errors.prescription_date}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="dose"
            label="Dose"
            type="text"
            fullWidth
            value={formData.dose}
            onChange={handleChange}
            error={!!errors.dose}
            helperText={errors.dose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingPatientMedicine ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientMedicine;
