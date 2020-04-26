import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeViewComponent } from './recipe-view.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RecipeService } from '../services/recipe.service';
import { of } from 'rxjs';

describe('RecipeViewComponent', () => {
  let component: RecipeViewComponent;
  let fixture: ComponentFixture<RecipeViewComponent>;

  const mockRecipe = {
    title: 'title',
    ingredients: 'ingredients',
    procedure: 'procedure',
    group: 'group'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: { }},
        { provide: MAT_DIALOG_DATA, useValue: {recipe: mockRecipe} },
        { provide: RecipeService, useValue: {
            getGroups: () => of([])
        }}
      ],
      declarations: [ RecipeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
