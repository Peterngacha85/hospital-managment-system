// src/services/doctorService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/doctors';

export const getAllDoctors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createDoctor = async (doctor) => {
  const response = await axios.post(API_URL, doctor);
  return response.data;
};

export const updateDoctor = async (id, doctor) => {
  const response = await axios.put(`${API_URL}/${id}`, doctor);
  return response.data;
};

export const deleteDoctor = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
