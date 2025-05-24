// src/api/apiRestaurants.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost/api';

export const fetchRestaurants = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/restaurants`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

export const updateRestaurant = async (token, id, data) => {
  const response = await axios.put(`${API_BASE_URL}/restaurants/${id}/`, data, {
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
