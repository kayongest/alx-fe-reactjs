import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import AddRecipeForm from './components/AddRecipeForm';
import AdvancedFilters from './components/AdvancedFilters';
import './App.css';

// Simple test component
const TestComponent = () => {
  return (
    <div>
      <h2>Test Component Works!</h2>
      <p>If you can see this, React is working.</p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Recipe Sharing App</h1>
        <TestComponent />
        <AddRecipeForm />
        <SearchBar />
        <AdvancedFilters />
      </div>
    </Router>
  );
}

export default App;
