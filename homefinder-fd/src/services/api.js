import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = {
  // User endpoints
  login: (email) => axios.get(`${API_BASE_URL}/users`).then(res => {
    const user = res.data.find(u => u.email === email);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    throw new Error('User not found');
  }),

  register: (userData) => axios.post(`${API_BASE_URL}/users`, userData),

  // Properties endpoints
   createProperty: (propertyData) => axios.post(`${API_BASE_URL}/properties`, propertyData),
  updateProperty: (id, propertyData) => axios.put(`${API_BASE_URL}/properties/${id}`, propertyData),
  deleteProperty: (id) => axios.delete(`${API_BASE_URL}/properties/${id}`),
  getProperties: (params) => axios.get(`${API_BASE_URL}/properties`, { params }),
  getPropertyTypes: () => axios.get(`${API_BASE_URL}/properties/types`),
  getProperty: (id) => axios.get(`${API_BASE_URL}/properties/${id}`),

  // Favorites endpoints
  getFavorites: (userId) => {
    console.log(`Fetching favorites for user ${userId}`);
    return axios.get(`${API_BASE_URL}/favorites/${userId}`)
      .then(response => {
        console.log('Favorites response:', response);
        return response;
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
        throw error;
      });
  },

  addFavorite: (userId, propertyId) => {
    console.log(`Adding favorite: userId=${userId}, propertyId=${propertyId}`);
    return axios.post(`${API_BASE_URL}/favorites`, {
      user_id: userId,
      property_id: propertyId
    })
    .then(response => {
      console.log('Add favorite response:', response);
      return response;
    })
    .catch(error => {
      console.error('Error adding favorite:', error);
      throw error;
    })},
  // Contact requests
  createContactRequest: (data) => axios.post(`${API_BASE_URL}/contact-requests`, data),
};

export default api;

