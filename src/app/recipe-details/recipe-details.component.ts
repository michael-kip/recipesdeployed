import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeapiservicesService } from '../Services/recipeapiservices.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  
  @Input() viewMode: boolean = false;

  @Input() currentRecipe: Recipe = {
    recipe_name: '',
    ingredient: '',
    category: '',
    recipe_pic: '',
    country: '',
    procedure: '',
    guests_served:0,
    created_date: '',  
    created_by: ''
  };
  message: string = '';

  constructor(
    private recipeapiService: RecipeapiservicesService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getRecipe(this.route.snapshot.params['id']);
    }
  }
  getRecipe(id: any): void {
    this.recipeapiService.get(id)
    .subscribe({
      next: (data) => {
        this.currentRecipe = data;
        console.log(data);
      },
    });
  }
  updateRecipe(): void {
    this.message = '';
    this.recipeapiService.update(this.currentRecipe.id, this.currentRecipe).subscribe({
      next: (response) => {
        console.log(response);
        this.message = response.message ? response.message: 'Recipe updated successfully';
      },
    });
  }
  deleteRecipe(): void {
    this.recipeapiService.delete(this.currentRecipe.id)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/recipes']);
      },
    });
  }


    }
