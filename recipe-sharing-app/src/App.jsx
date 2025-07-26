import RecipeList from './RecipeList';
import AddRecipeForm from './AddRecipeForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Recipe Sharing App</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

export default App;
