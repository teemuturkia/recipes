import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {

  recipe: Recipe;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.recipe = data.recipe;
  }

  ngOnInit(): void {
    console.log('d', this.data);
  }

}
