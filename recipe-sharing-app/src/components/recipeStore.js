import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  // Initial state
  recipes: [],
  searchTerm: '',
  filters: {
    category: '',
    difficulty: '',
    maxPrepTime: '',
    maxCookTime: '',
    hasIngredients: []
  },
  
  // Basic CRUD operations
  addRecipe: (newRecipe) => {
    try {
      set(state => ({ recipes: [...state.recipes, newRecipe] }));
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  },
  
  setRecipes: (recipes) => {
    try {
      set({ recipes: recipes || [] });
    } catch (error) {
      console.error('Error setting recipes:', error);
    }
  },
  
  updateRecipe: (recipeId, updatedRecipe) => {
    try {
      set(state => ({
        recipes: state.recipes.map(recipe => 
          recipe.id === recipeId ? { ...recipe, ...updatedRecipe } : recipe
        )
      }));
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  },
  
  deleteRecipe: (recipeId) => {
    try {
      set(state => ({
        recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
      }));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  },
  
  // Search and filter actions
  setSearchTerm: (searchTerm) => {
    try {
      set({ searchTerm: searchTerm || '' });
    } catch (error) {
      console.error('Error setting search term:', error);
    }
  },
  
  setFilter: (filterType, value) => {
    try {
      set(state => ({
        filters: { ...state.filters, [filterType]: value }
      }));
    } catch (error) {
      console.error('Error setting filter:', error);
    }
  },
  
  clearFilters: () => {
    try {
      set({ 
        searchTerm: '', 
        filters: {
          category: '',
          difficulty: '',
          maxPrepTime: '',
          maxCookTime: '',
          hasIngredients: []
        }
      });
    } catch (error) {
      console.error('Error clearing filters:', error);
    }
  },
  
  // Computed filtered recipes with advanced filtering
  getFilteredRecipes: () => {
    try {
      const { recipes, searchTerm, filters } = get();
      let filtered = [...(recipes || [])];
      
      // Text search filter
      if (searchTerm && searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(recipe => 
          recipe.title && recipe.title.toLowerCase().includes(searchLower) ||
          recipe.description && recipe.description.toLowerCase().includes(searchLower) ||
          (recipe.ingredients && recipe.ingredients.some(ingredient => 
            ingredient && ingredient.toLowerCase().includes(searchLower)
          )) ||
          (recipe.instructions && recipe.instructions.toLowerCase().includes(searchLower))
        );
      }
      
      // Category filter
      if (filters.category) {
        filtered = filtered.filter(recipe => 
          recipe.category && recipe.category === filters.category
        );
      }
      
      // Difficulty filter
      if (filters.difficulty) {
        filtered = filtered.filter(recipe => 
          recipe.difficulty && recipe.difficulty === filters.difficulty
        );
      }
      
      // Preparation time filter
      if (filters.maxPrepTime) {
        filtered = filtered.filter(recipe => 
          recipe.prepTime && recipe.prepTime <= parseInt(filters.maxPrepTime)
        );
      }
      
      // Cooking time filter
      if (filters.maxCookTime) {
        filtered = filtered.filter(recipe => 
          recipe.cookTime && recipe.cookTime <= parseInt(filters.maxCookTime)
        );
      }
      
      // Ingredients filter
      if (filters.hasIngredients && filters.hasIngredients.length > 0) {
        filtered = filtered.filter(recipe => 
          recipe.ingredients && filters.hasIngredients.every(ingredient =>
            recipe.ingredients.some(recipeIngredient =>
              recipeIngredient && recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
            )
          )
        );
      }
      
      return filtered;
    } catch (error) {
      console.error('Error getting filtered recipes:', error);
      return [];
    }
  },
  
  // Get unique values for filter options
  getCategories: () => {
    try {
      const { recipes } = get();
      const categories = (recipes || [])
        .map(recipe => recipe.category)
        .filter(Boolean);
      return [...new Set(categories)];
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  },
  
  getDifficulties: () => {
    try {
      const { recipes } = get();
      const difficulties = (recipes || [])
        .map(recipe => recipe.difficulty)
        .filter(Boolean);
      return [...new Set(difficulties)];
    } catch (error) {
      console.error('Error getting difficulties:', error);
      return [];
    }
  },
  
  getAllIngredients: () => {
    try {
      const { recipes } = get();
      const ingredients = (recipes || [])
        .flatMap(recipe => recipe.ingredients || [])
        .filter(Boolean);
      return [...new Set(ingredients)];
    } catch (error) {
      console.error('Error getting ingredients:', error);
      return [];
    }
  }
}))

export default useRecipeStore; 