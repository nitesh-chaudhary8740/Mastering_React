// path: src/api/apiClient.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to handle the request logic
const apiRequest = async (config) => {
  try {
    const response = await axiosInstance(config);
    return response.data; // Axios puts the JSON response in the .data property
  } catch (error) {
    // Axios centralizes error handling: 
    // error.response contains the data sent back from the server (like 400 or 500 errors)
    const message = error.response?.data?.message || error.message || "API Error";
    console.error("❌ API Request Error:", message);
    throw new Error(message);
  }
};

// CRUD wrapper
export const api = {
  get: (url, token) => 
    apiRequest({ method: 'GET', url, headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  
  post: (url, data, token) => 
    apiRequest({ method: 'POST', url, data, headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  
  put: (url, data, token) => 
    apiRequest({ method: 'PUT', url, data, headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  
  patch: (url, data, token) => 
    apiRequest({ method: 'PATCH', url, data, headers: token ? { Authorization: `Bearer ${token}` } : {} }),
    
  delete: (url, token) => 
    apiRequest({ method: 'DELETE', url, headers: token ? { Authorization: `Bearer ${token}` } : {} }),
};