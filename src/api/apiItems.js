// apiItems.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost/api';

export const fetchUserItems = async (token, userId) => {
  const response = await axios.get(`${API_BASE_URL}/items/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data.filter(item => item.user === userId);
};

export const deleteItem = async (token, itemId) => {
  await axios.delete(`${API_BASE_URL}/items/${itemId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
