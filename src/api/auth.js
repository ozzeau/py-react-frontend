import axios from 'axios';

export const registerUser = async (email, password, username) => {
  return axios.post('http://localhost/api/auth/register/', {
    email,
    password,
    username
  });
};

export const loginUser = async (email, password) => {
  return axios.post('http://localhost/api/auth/login/', {
    email,
    password
  });
};
