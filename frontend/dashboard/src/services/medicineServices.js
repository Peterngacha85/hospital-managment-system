// src/services/medicineServices.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/medicines';

// Get all medicines
export const getAllMedicines = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new medicine
export const createMedicine = async (medicineData) => {
  const response = await axios.post(API_URL, medicineData);
  return response.data;
};

// Get a medicine by ID
export const getMedicine = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update a medicine
export const updateMedicine = async (id, medicineData) => {
  const response = await axios.patch(`${API_URL}/${id}`, medicineData);
  return response.data;
};

// Delete a medicine
export const deleteMedicine = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
