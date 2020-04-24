import { Ingredient } from './ingredient';

export interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  procedure: string;
}
