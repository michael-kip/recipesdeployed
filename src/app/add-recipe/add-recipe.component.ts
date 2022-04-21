import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeapiservicesService } from '../Services/recipeapiservices.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  recipe: Recipe = {
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
  submitted=false;

  constructor(private recipeapiService: RecipeapiservicesService) { }

  ngOnInit(): void {
  }
  saveRecipe(): void {
    const data = {
      recipe_name: this.recipe.recipe_name,
      ingredient: this.recipe.ingredient,
      category: this.recipe.category,
      recipe_pic: this.recipe.recipe_pic,
      country: this.recipe.country,
      procedure: this.recipe.procedure,
      guests_served:this.recipe.guests_served,
      created_date: this.recipe.created_date,
      created_by: this.recipe.created_by
    };
    this.recipeapiService.create(data)
    .subscribe({
      next: response => {
        console.log(response);
        this.submitted=true;
      },
    });
  }
  newRecipe(): void {
    this.submitted=false;
    this.recipe = {
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
  }

}
