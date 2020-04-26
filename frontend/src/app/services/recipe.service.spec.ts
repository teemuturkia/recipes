import { TestBed } from '@angular/core/testing';

import { RecipeService } from './recipe.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('RecipeService', () => {
  let service: RecipeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ]
    });
    service = TestBed.inject(RecipeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('calls backend on save', () => {
    const mockRecipe = {
      title: 'Title',
      ingredients: 'Ingredients',
      procedure: 'Procedure',
      group: 'Group'
    };

    service.save(mockRecipe)
      .subscribe(saved => {
        expect(saved.title).toEqual('Title');
      });

    const req = httpTestingController.expectOne('/api/recipes');
    expect(req.request.method).toEqual('POST');
    req.flush(mockRecipe);
  });
});
