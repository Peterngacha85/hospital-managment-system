import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Base URL for your API

// Fetch all patient medicines
export const getAllPatientMedicines = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/patientMedicines`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all patient medicines:', error);
        throw error;
    }
};

// Fetch patient medicine by ID
export const getPatientMedicineById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/patientMedicines/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching patient medicine by ID:', error);
        throw error;
    }
};

// Create a new patient medicine
export const createPatientMedicine = async (patientMedicine) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/patientMedicines`, patientMedicine);
        return response.data;
    } catch (error) {
        console.error('Error creating patient medicine:', error);
        throw error;
    }
};

// Update a patient medicine
export const updatePatientMedicine = async (id, updatedPatientMedicine) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/patientMedicines/${id}`, updatedPatientMedicine);
        return response.data;
    } catch (error) {
        console.error('Error updating patient medicine:', error);
        throw error;
    }
};

// Delete a patient medicine
export const deletePatientMedicine = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/patientMedicines/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting patient medicine:', error);
        throw error;
    }
};

// Fetch patient medicines by patient ID
export const getPatientMedicinesByPatientId = async (patientId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/patientMedicines/patient/${patientId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching patient medicines by patient ID:', error);
        throw error;
    }
};

// Fetch patient medicines by medicine ID
export const getPatientMedicinesByMedicineId = async (medicineId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/patientMedicines/medicine/${medicineId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching patient medicines by medicine ID:', error);
        throw error;
    }
};

// Fetch patient medicines by various parameters
export const getPatientMedicinesByParams = async (params) => {
    try {
        const { patientId, medicineId, prescriptionDate, dose } = params;
        const response = await axios.get(`${API_BASE_URL}/patientMedicines`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching patient medicines by parameters:', error);
        throw error;
    }
};
