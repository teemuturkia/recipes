import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { environment } from '../../environments/environment';
import { RecipeList } from '../models/recipe-list';
import { catchError, map, retry, tap } from 'rxjs/operators';
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
    let httpAction: Observable<Recipe>;
    if (recipe.id) {
      httpAction = this.http.put<Recipe>(this.baseUrl + '/' + recipe.id, recipe);
    } else {
      httpAction = this.http.post<Recipe>(this.baseUrl, recipe);
    }
    return httpAction.pipe(
      retry(2),
      catchError(err => {
        this.snackBar.open('Tallennus epäonnistui! Yritä hetken kuluttua uudelleen...');
        throw err;
      }),
      tap(saved => {
        let list = this.recipes.value;
        list = list.filter(r => r.id !== saved.id);
        list.push(saved);
        this.recipes.next(list);
      })
    );
  }

  delete(recipeId: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + recipeId).pipe(
      tap(() => {
        let list = this.recipes.value;
        list = list.filter(r => r.id !== recipeId);
        this.recipes.next(list);
      })
    );
  }

  getGroups(): Observable<string[]> {
    return this.getAll().pipe(
      map(recipes => {
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
