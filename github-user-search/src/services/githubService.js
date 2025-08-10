import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Handling specific HTTP errors
      switch (error.response.status) {
        case 404:
          throw new Error(`User "${username}" not found on GitHub`);
        case 403:
          throw new Error('API rate limit exceeded. Try again later.');
        case 401:
          throw new Error('Authentication failed');
        default:
          throw new Error(`GitHub API error: ${error.response.status}`);
      }
    } else if (error.request) {
      throw new Error('No response from server. Check your internet connection.');
    } else {
      throw new Error('Error setting up request');
    }
  }
};