import axios from 'axios';
import { API_BASE_URL } from '../../config/constants'; // Connect to config

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});


 
// Add interceptors if needed (e.g., auth tokens from core/auth)
export default apiClient;