import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent {

  recipe: Recipe;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<RecipeViewComponent>,
              private recipeService: RecipeService) {
    this.recipe = data.recipe;
  }

  delete(): void {
    this.recipeService.delete(this.recipe.id).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
