// src/services/githubService.js
import axios from 'axios';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Looks like we cant find the user"); // Exact error message
    }
    throw new Error('Failed to fetch user data');
  }
};