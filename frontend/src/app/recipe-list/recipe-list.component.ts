import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';
import { RecipeViewComponent } from '../recipe-view/recipe-view.component';
import { map, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: Observable<Recipe[]>;
  filteredRecipes: Observable<Recipe[]>;
  groups: Observable<string[]>;
  filter = new FormControl('');

  constructor(private recipeService: RecipeService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getAll();

    this.filter.valueChanges.subscribe(() => this.filterRecipes());
    this.recipes.pipe(tap(() => this.filterRecipes())).subscribe();
  }

  addNew(): void {
    this.dialog.open(EditRecipeComponent);
  }

  edit(recipe: Recipe): void {
    this.dialog.open(EditRecipeComponent, {
      data: {recipe}
    });
  }

  openRecipe(recipe: Recipe): void {
    this.dialog.open(RecipeViewComponent, {
      data: {recipe}
    }).afterClosed().subscribe(result => {
      if (result === 'edit') {
        this.edit(recipe);
      }
    });
  }

  private filterRecipes(): void {
    const filterVal = this.filter.value;
    this.filteredRecipes = this.recipes.pipe(
      map(list => {
        if (!Array.isArray(list)) {
          return [];
        }
        return list.filter(r => r.title.toLowerCase().includes(filterVal.toLowerCase()));
      })
    );

    this.groups = this.filteredRecipes.pipe(
      map(list => {
        return this.recipeService.getUniqueGroups(list.map(r => r.group));
      })
    );
  }

}
