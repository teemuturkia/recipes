import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';
import { RecipeViewComponent } from '../recipe-view/recipe-view.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: Observable<Recipe[]>;
  groups: Observable<string[]>;

  constructor(private recipeService: RecipeService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getAll();
    this.groups = this.recipeService.getGroups();
  }

  addNew(): void {
    this.dialog.open(EditRecipeComponent);
  }

  openRecipe(recipe: Recipe): void {
    this.dialog.open(RecipeViewComponent, {
      data: {recipe}
    });
  }

}
