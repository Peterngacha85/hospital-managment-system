import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/bookings';
const PATIENT_API_BASE_URL = 'http://localhost:5000/api/patients';
const DOCTOR_API_BASE_URL = 'http://localhost:5000/api/doctors';
const CLINIC_API_BASE_URL = 'http://localhost:5000/api/clinics';

// Function to get all bookings
export const getAllBookings = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Function to create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(API_BASE_URL, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Function to update an existing booking
export const updateBooking = async (id, bookingData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

// Function to delete a booking
export const deleteBooking = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};

// Function to get all patients
export const getAllPatients = async () => {
  try {
    const response = await axios.get(PATIENT_API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

// Function to get all doctors
export const getAllDoctors = async () => {
  try {
    const response = await axios.get(DOCTOR_API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

// Function to get all clinics
export const getAllClinics = async () => {
  try {
    const response = await axios.get(CLINIC_API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching clinics:', error);
    throw error;
  }
};
