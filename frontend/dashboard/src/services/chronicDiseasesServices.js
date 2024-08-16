// src/services/chronicDiseasesServices.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chronicDiseases';

// Get all chronic diseases
export const getAllChronicDiseases = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new chronic disease
export const createChronicDisease = async (chronicDiseaseData) => {
  const response = await axios.post(API_URL, chronicDiseaseData);
  return response.data;
};

// Get a chronic disease by ID
export const getChronicDisease = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update a chronic disease
export const updateChronicDisease = async (id, chronicDiseaseData) => {
  const response = await axios.put(`${API_URL}/${id}`, chronicDiseaseData);
  return response.data;
};

// Delete a chronic disease
export const deleteChronicDisease = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
