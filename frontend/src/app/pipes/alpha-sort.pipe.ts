import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../models/recipe';

@Pipe({
  name: 'alphaSort'
})
export class AlphaSortPipe implements PipeTransform {

  transform(recipes: Recipe[]): Recipe[] {
    if (!recipes) {
      return recipes;
    }
    return recipes.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }

}
