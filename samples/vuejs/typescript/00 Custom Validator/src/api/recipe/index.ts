import {RecipeEntity} from '../../model';
import {mockRecipes} from './mockData';

let recipes = mockRecipes;

const fetchRecipeById = (id: number): Promise<RecipeEntity> => {
  const recipe = recipes.find((r) => r.id === id);
  return Promise.resolve(recipe);
}

export const recipeAPI = {
  fetchRecipeById,
}