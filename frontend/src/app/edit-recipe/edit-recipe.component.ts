import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {

  recipe: Recipe;
  recipeForm: FormGroup;
  groups: string[];
  filteredGroups: Observable<string[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<EditRecipeComponent>,
              private fb: FormBuilder,
              private recipeService: RecipeService) {
    this.recipe = data.recipe || new Recipe();
  }

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      title: [this.recipe.title, Validators.required],
      ingredients: this.recipe.ingredients,
      procedure: [this.recipe.procedure, Validators.required],
      group: [this.recipe.group, Validators.required]
    });
    this.recipeService.getGroups().subscribe(groups => {
      this.groups = groups;
      this.filteredGroups = this.recipeForm.get('group').valueChanges
        .pipe(
          startWith(''),
          map(value => this.filterGroups(value))
        );
    });
  }

  save(values): void {
    Object.assign(this.recipe, values);
    this.recipeService.save(this.recipe).subscribe(() => {
      this.dialogRef.close();
    });
  }

  private filterGroups(val): string[] {
    const filterValue = val.toLowerCase();
    return this.groups.filter(g => g.toLowerCase().includes(filterValue));
  }

}
