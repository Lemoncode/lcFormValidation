export class RecipeEntity {
  id: number;
  name: string;
  ingredients: string[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.ingredients = [];
  }
}