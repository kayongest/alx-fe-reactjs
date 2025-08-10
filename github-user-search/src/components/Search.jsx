// src/components/Search.jsx
import { useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a GitHub username");
      return;
    }

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError(
        err.response?.status === 404
          ? "Looks like we cant find the user"
          : err.message
      ); // Directly using the thrown message without changes
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Search GitHub Users</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className={error ? "error-input" : ""}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {loading && <div className="loading-indicator">Loading...</div>}
      {error && (
        <div className="error-message">
          {error === "Looks like we cant find the user" ? (
            <p>Looks like we cant find the user</p>
          ) : (
            <p>{error}</p>
          )}
        </div>
      )}
      {/*  Display user data if available */}
      {userData && (
        <div className="user-card">
          <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
          <h3>{userData.name || userData.login}</h3>
          <p>{userData.bio || "No bio available"}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}
