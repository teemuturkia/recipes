import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';

const routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recipes/:recipeId', component: RecipeViewComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouteModule { }
