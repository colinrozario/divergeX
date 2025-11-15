import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('auth-storage') || '{}')?.state?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getProfile = () => api.get('/auth/profile');
export const updateProfile = (data) => api.put('/auth/profile', data);

// Communication
export const analyzeTone = (data) => api.post('/communication/analyze-tone', data);
export const formatMessage = (data) => api.post('/communication/format-message', data);
export const simulateConversation = (data) => api.post('/communication/simulate-conversation', data);
export const saveConversation = (data) => api.post('/communication/save-conversation', data);
export const getConversationHistory = () => api.get('/communication/conversation-history');

// Learning
export const processText = (data) => api.post('/learning/process-text', data);
export const generateVisualSummary = (data) => api.post('/learning/generate-visual-summary', data);
export const getLearningHistory = () => api.get('/learning/learning-history');
export const getContent = (id) => api.get(`/learning/content/${id}`);

// Planning
export const getTasks = (params) => api.get('/planning/tasks', { params });
export const createTask = (data) => api.post('/planning/tasks', data);
export const updateTask = (id, data) => api.put(`/planning/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/planning/tasks/${id}`);
export const getTimeline = (params) => api.get('/planning/timeline', { params });
export const createTimelineEvent = (data) => api.post('/planning/timeline/events', data);

// Accessibility
export const getAccessibilitySettings = () => api.get('/accessibility/settings');
export const updateAccessibilitySettings = (data) => api.put('/accessibility/settings', data);

export default api;
