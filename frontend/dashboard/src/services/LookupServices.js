import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Base URL for your API

export const getPatientsByName = async (name) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/patients`, {
            params: { name }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching patients by name:', error);
        throw error;
    }
};

export const getMedicinesByName = async (name) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/medicines`, {
            params: { name }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching medicines by name:', error);
        throw error;
    }
};
