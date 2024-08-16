// services/PatientMedicineServices.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/patientMedicines'; // Replace with your actual API base URL
const MEDICINE_API_URL = 'http://localhost:5000/api/medicines'; // Replace with your actual medicine API URL
const PATIENT_API_URL = 'http://localhost:5000/api/patients'; // Replace with your actual patient API URL

// Get all PatientMedicines
export const getAllPatientMedicines = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching patient medicines:', error);
    throw error;
  }
};

// Create a new PatientMedicine
export const createPatientMedicine = async (data) => {
  try {
    const response = await axios.post(API_BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error creating patient medicine:', error);
    throw error;
  }
};

// Update an existing PatientMedicine
export const updatePatientMedicine = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating patient medicine:', error);
    throw error;
  }
};

// Delete a PatientMedicine
export const deletePatientMedicine = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting patient medicine:', error);
    throw error;
  }
};

// Get all Medicines
export const getAllMedicines = async () => {
  try {
    const response = await axios.get(MEDICINE_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching medicines:', error);
    throw error;
  }
};

// Get all Patients
export const getAllPatients = async () => {
  try {
    const response = await axios.get(PATIENT_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};
