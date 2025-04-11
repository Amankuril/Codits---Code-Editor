// src/api/authApi.js
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const signupUser = async (formData) => {
  
  const res = await axios.post(`${BASE_URL}/users/register`, formData);
  console.log(res.data);
  return res.data;
};

export const loginUser = async (formData) => {
  
  const res = await axios.post(`${BASE_URL}/users/login`, formData);

  const token = res.data.token;
  // Store the token in local storage or a cookie
  localStorage.setItem("token", token);

  return res.data;
};

export const logoutUser = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BASE_URL}/users/logout`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  localStorage.removeItem("token");
  localStorage.removeItem("username");

  return response.data;
};

