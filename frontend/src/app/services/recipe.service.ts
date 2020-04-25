import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { environment } from '../../environments/environment';
import { RecipeList } from '../models/recipe-list';
import { catchError, map, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  baseUrl = environment.apiEndPoint + '/recipes';

  recipes = new BehaviorSubject<Recipe[]>(null);

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getAll(): Observable<Recipe[]> {
    if (this.recipes.value === null) {
      this.updateDataModel();
    }
    return this.recipes.asObservable();
  }

  save(recipe: Recipe): Observable<any> {
    // TODO: validation
    const list = this.recipes.value;
    list.push(recipe);
    this.recipes.next(list);
    // Save to server
    return this.http.post(this.baseUrl, recipe).pipe(
      retry(2),
      catchError(err => {
        this.snackBar.open('Tallennus epäonnistui! Yritä hetken kuluttua uudelleen...');
        // Remove from list
        list.pop();
        this.recipes.next(list);
        throw err;
      })
    );
  }

  getGroups(): Observable<string[]> {
    return this.getAll().pipe(
      map((recipes) => {
        if (!recipes) {
          return [];
        }
        const groups = recipes.map(r => r.group);
        // Create unique array
        return Array.from(new Set(groups)).sort();
      })
    );
  }

  private updateDataModel(): void {
    this.http.get<RecipeList>(this.baseUrl).pipe(
      map(this.convertRecipeListToArray)
    ).subscribe(list => this.recipes.next(list));
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
