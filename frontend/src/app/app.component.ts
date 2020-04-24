import { Component, OnInit } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from './models/recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Reseptipankki';
  recipes: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getAll();
  }
}
