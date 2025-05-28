import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API endpoints
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
};

export const guestHouseService = {
  getAll: () => api.get('/guest-houses'),
  create: (data) => api.post('/guest-houses', data),
  update: (id, data) => api.put(`/guest-houses/${id}`, data),
  delete: (id) => api.delete(`/guest-houses/${id}`),
};

export const bookingService = {
  create: (data) => api.post('/bookings', data),
  getAll: () => api.get('/bookings'),
  getById: (id) => api.get(`/bookings/${id}`),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  delete: (id) => api.delete(`/bookings/${id}`),
  approve: (id) => api.patch(`/bookings/${id}/approve`),
  reject: (id, reason) => api.patch(`/bookings/${id}/reject`, { reason }),
};

export const userService = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
  changePassword: (data) => api.put('/users/change-password', data),
};

// Guest House
export const fetchGuestHouses = () => guestHouseService.getAll();
export const createGuestHouse = (data) => guestHouseService.create(data);
export const updateGuestHouse = (id, data) => guestHouseService.update(id, data);
export const deleteGuestHouse = (id) => guestHouseService.delete(id);

// Booking
export const fetchUserBookings = (userId) => bookingService.getAll(); // You may want to filter by userId in your backend
export const fetchPendingBookings = () => bookingService.getAll(); // You may want to filter by status in your backend
export const approveBooking = (id) => bookingService.approve(id);
export const rejectBooking = (id, reason) => bookingService.reject(id, reason);
export const getBookingStats = () => bookingService.getAll(); // Placeholder
export const getOccupancyRates = () => bookingService.getAll(); // Placeholder
export const fetchAvailableRooms = () => guestHouseService.getAll(); // Placeholder
export const fetchAvailableBeds = () => guestHouseService.getAll(); // Placeholder

export default api;
