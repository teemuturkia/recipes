import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getAll();
  }

  addNew(): void {
    this.dialog.open(EditRecipeComponent);
  }

}
