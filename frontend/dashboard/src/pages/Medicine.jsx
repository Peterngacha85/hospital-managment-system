// src/components/Medicine.jsx

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
  styled
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import {
  getAllMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine
} from '../services/medicineServices';

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

const Medicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dose: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchMedicines();
  }, []);

  useEffect(() => {
    filterMedicines();
  }, [medicines, searchQuery]);

  const fetchMedicines = async () => {
    const data = await getAllMedicines();
    setMedicines(data);
  };

  const filterMedicines = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(lowercasedQuery) ||
      medicine.description.toLowerCase().includes(lowercasedQuery) ||
      medicine.dose.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredMedicines(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpen = (medicine = null) => {
    setEditingMedicine(medicine);
    setFormData(medicine ? {
      name: medicine.name,
      description: medicine.description,
      dose: medicine.dose,
    } : { name: '', description: '', dose: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMedicine(null);
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
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
      if (editingMedicine) {
        await updateMedicine(editingMedicine._id, formData);
      } else {
        await createMedicine(formData);
      }
      fetchMedicines();
      handleClose();
    } catch (error) {
      console.error('Error saving medicine:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedicine(id);
      fetchMedicines();
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Medicines
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
        Add Medicine
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Dose</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMedicines.map((medicine) => (
              <StyledTableRow key={medicine._id}>
                <TableCell>{medicine.name}</TableCell>
                <TableCell>{medicine.description}</TableCell>
                <TableCell>{medicine.dose}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(medicine)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(medicine._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingMedicine ? 'Edit Medicine' : 'Add Medicine'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            margin="dense"
            name="dose"
            label="Dose"
            fullWidth
            value={formData.dose}
            onChange={handleChange}
            error={!!errors.dose}
            helperText={errors.dose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingMedicine ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Medicine;
