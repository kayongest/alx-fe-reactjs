import { Link } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  if (recipes.length === 0) {
    return (
      <div className="recipe-list">
        <h2>No recipes yet</h2>
        <p>Add your first recipe using the form above!</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      <h2>Your Recipes</h2>
      {recipes.map(recipe => (
        <div key={recipe.id} className="recipe-card">
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <Link to={`/recipe/${recipe.id}`} className="view-details-link">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList; 