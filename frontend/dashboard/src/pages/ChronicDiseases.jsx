// src/components/ChronicDiseases.jsx

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
  getAllChronicDiseases,
  createChronicDisease,
  updateChronicDisease,
  deleteChronicDisease
} from '../services/chronicDiseasesServices';

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

const ChronicDiseases = () => {
  const [chronicDiseases, setChronicDiseases] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChronicDiseases, setFilteredChronicDiseases] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingChronicDisease, setEditingChronicDisease] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchChronicDiseases();
  }, []);

  useEffect(() => {
    filterChronicDiseases();
  }, [chronicDiseases, searchQuery]);

  const fetchChronicDiseases = async () => {
    const data = await getAllChronicDiseases();
    setChronicDiseases(data);
  };

  const filterChronicDiseases = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = chronicDiseases.filter(chronicDisease =>
      chronicDisease.name.toLowerCase().includes(lowercasedQuery) ||
      chronicDisease.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredChronicDiseases(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpen = (chronicDisease = null) => {
    setEditingChronicDisease(chronicDisease);
    setFormData(chronicDisease ? {
      name: chronicDisease.name,
      description: chronicDisease.description,
    } : { name: '', description: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingChronicDisease(null);
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
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
      if (editingChronicDisease) {
        await updateChronicDisease(editingChronicDisease._id, formData);
      } else {
        await createChronicDisease(formData);
      }
      fetchChronicDiseases();
      handleClose();
    } catch (error) {
      console.error('Error saving chronic disease:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteChronicDisease(id);
      fetchChronicDiseases();
    } catch (error) {
      console.error('Error deleting chronic disease:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Chronic Diseases
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
        Add Chronic Disease
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredChronicDiseases.map((chronicDisease) => (
              <StyledTableRow key={chronicDisease._id}>
                <TableCell>{chronicDisease.name}</TableCell>
                <TableCell>{chronicDisease.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(chronicDisease)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(chronicDisease._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingChronicDisease ? 'Edit Chronic Disease' : 'Add Chronic Disease'}</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingChronicDisease ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ChronicDiseases;
