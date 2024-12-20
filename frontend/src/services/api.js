import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
  getReports: () => axios.get(`${API_URL}/reports`),
  createReport: (data) => axios.post(`${API_URL}/reports`, data),
  getReport: (id) => axios.get(`${API_URL}/reports/${id}`),
  updateReport: (id, data) => axios.put(`${API_URL}/reports/${id}`, data),
  deleteReport: (id) => axios.delete(`${API_URL}/reports/${id}`)
};