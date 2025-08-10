// src/components/Home.jsx
import Search from './Search';

export default function Home() {
  return (
    <main>
      <h2>Welcome to GitHub User Search</h2>
      <Search />
      <div className="home-content">
        <p>Search for any GitHub user to see their profile information.</p>
      </div>
    </main>
  );
}