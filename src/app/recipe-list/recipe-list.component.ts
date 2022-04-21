import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeapiservicesService } from '../Services/recipeapiservices.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes?: Recipe[];
  currentRecipe: Recipe = {
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
  currentIndex: number = -1;
  recipe_name: string = '';

  constructor(private recipeapiService:RecipeapiservicesService) { }

  ngOnInit(): void {
    this.retrieveRecipes();
  }
  retrieveRecipes(): void {
    this.recipeapiService.getAll().subscribe({
      next: (data) => {
        this.recipes = data;
        console.log("My recipes",data);
      },
    });
  }
  refreshList(): void {
    this.retrieveRecipes();
    this.currentRecipe = {
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
    this.currentIndex = -1;
  }
  setActiveRecipe(recipe: Recipe, index: number): void {
    this.currentRecipe = recipe;
    this.currentIndex = index;
  }
  removeAllRecipes(): void {
    this.recipeapiService.deleteAll().subscribe({
      next: (response) => {
        console.log(response);
        this.refreshList();
      },
    });
  }
  searchName(): void {
    this.currentRecipe = {
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
    this.currentIndex = -1;
    this.recipeapiService.findByName(this.recipe_name).subscribe({
      next: (data) => {
        this.recipes = data;
        console.log("My recipes",data);
      },
    });
  } 

}
