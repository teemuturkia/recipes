import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../models/recipe';

@Pipe({
  name: 'groupFilter'
})
export class GroupFilterPipe implements PipeTransform {

  transform(recipes: Recipe[], group: string): Recipe[] {
    if (!recipes) {
      return recipes;
    }
    return recipes.filter(r => r.group === group);
  }

}
