// src/services/clinicService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/clinics';

export const getAllClinics = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching clinics:', error);
    return [];
  }
};

export const createClinic = async (clinicData) => {
  try {
    const response = await axios.post(API_URL, clinicData);
    return response.data;
  } catch (error) {
    console.error('Error creating clinic:', error);
    throw error;
  }
};

export const updateClinic = async (id, clinicData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, clinicData);
    return response.data;
  } catch (error) {
    console.error('Error updating clinic:', error);
    throw error;
  }
};

export const deleteClinic = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting clinic:', error);
    throw error;
  }
};
