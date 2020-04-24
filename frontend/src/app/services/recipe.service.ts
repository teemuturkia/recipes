import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { environment } from '../../environments/environment';
import { RecipeList } from '../models/recipe-list';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  baseUrl = environment.apiEndPoint + '/recipes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Recipe[]> {
    return this.http.get<RecipeList>(this.baseUrl).pipe(
      map(this.convertRecipeListToArray)
    );
  }

  private convertRecipeListToArray = (list: RecipeList) => {
    return Object.keys(list).reduce((arr, id) => {
      const recipe = list[id];
      recipe.id = id;
      arr.push(recipe);
      return arr;
    }, []);
  }
}
