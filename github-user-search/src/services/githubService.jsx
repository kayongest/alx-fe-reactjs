// src/services/githubService.js
import axios from "axios";

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      // Here, we handle different HTTP error statuses
      switch (error.response.status) {
        case 404:
          throw new Error(`User "${username}" not found on GitHub`);
        case 403:
          throw new Error(
            "GitHub API rate limit exceeded. Please try again later."
          );
        case 401:
          throw new Error(
            "Authentication failed. Please check your credentials."
          );
        default:
          throw new Error(`GitHub API error: ${error.response.status}`);
      }
    } else if (error.request) {
      throw new Error(
        "No response received from GitHub. Check your network connection."
      );
    } else {
      throw new Error("Error setting up the request to GitHub.");
    }
  }
};
