import axios from 'axios';

// In production (Vercel), VITE_API_URL points to Render backend
// In dev, Vite proxy handles /api → localhost:5001
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

export default api;
