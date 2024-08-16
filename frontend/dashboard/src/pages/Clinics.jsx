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
  InputAdornment,
  styled
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import { getAllClinics, createClinic, updateClinic, deleteClinic } from '../services/clinicService';

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

const Clinics = () => {
  const [clinics, setClinics] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredClinics, setFilteredClinics] = useState([]);

  useEffect(() => {
    fetchClinics();
  }, []);

  useEffect(() => {
    // Filter clinics whenever searchQuery changes
    const filtered = clinics.filter((clinic) =>
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredClinics(filtered);
  }, [searchQuery, clinics]);

  const fetchClinics = async () => {
    const clinics = await getAllClinics();
    setClinics(clinics);
  };

  const handleOpen = (clinic = null) => {
    setEditingClinic(clinic);
    setFormData(clinic ? clinic : { name: '', address: '', phone: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingClinic(null);
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
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
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
      if (editingClinic) {
        await updateClinic(editingClinic._id, formData);
      } else {
        await createClinic(formData);
      }
      fetchClinics();
      handleClose();
    } catch (error) {
      console.error('Error saving clinic:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClinic(id);
      fetchClinics();
    } catch (error) {
      console.error('Error deleting clinic:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Clinics
      </Typography>
      
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ marginTop: 2, marginBottom: 2, width: '100%' }}
      />
      <Button variant="contained" color="primary" onClick={() => handleOpen()} >
        Add Clinic
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClinics.map((clinic) => (
              <StyledTableRow key={clinic._id}>
                <TableCell>{clinic.name}</TableCell>
                <TableCell>{clinic.address}</TableCell>
                <TableCell>{clinic.phone}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(clinic)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(clinic._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingClinic ? 'Edit Clinic' : 'Add Clinic'}</DialogTitle>
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
            name="address"
            label="Address"
            type="text"
            fullWidth
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingClinic ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Clinics;
