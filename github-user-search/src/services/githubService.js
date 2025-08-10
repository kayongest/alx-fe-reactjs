// src/services/githubService.js
import axios from 'axios';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Looks like we cant find the user"); // EXACT required message
    }
    throw new Error("Failed to fetch user data"); // Generic fallback
  }
};