import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {

  recipeForm: FormGroup;
  groups: string[];
  filteredGroups: Observable<string[]>;

  constructor(private dialogRef: MatDialogRef<EditRecipeComponent>,
              private fb: FormBuilder,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      title: '',
      ingredients: '',
      procedure: '',
      group: ''
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

  save(recipe): void {
    this.recipeService.save(recipe).subscribe(() => {
      this.dialogRef.close();
    });
  }

  private filterGroups(val): string[] {
    const filterValue = val.toLowerCase();
    return this.groups.filter(g => g.toLowerCase().includes(filterValue));
  }

}
