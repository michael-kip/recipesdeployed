import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const baseUrl = 'https://delicious-recipes-app.herokuapp.com/api/recipes';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeapiservicesService {
  recipeUrl='https://delicious-recipes-app.herokuapp.com/api/recipes';
  constructor(private http:HttpClient) { }

  getAll():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.recipeUrl);
  }
  get(id:any):Observable<any>{
    return this.http.get(`${this.recipeUrl}/${id}`);
  }
  create(data:any):Observable<any>{
    return this.http.post(this.recipeUrl,data);
  }
  update(id:number, data:any):Observable<any>{
    return this.http.put(`${this.recipeUrl}/${id}`,data);
  }
  delete(id:number):Observable<any>{
    return this.http.delete(`${this.recipeUrl}/${id}`);
  }
  deleteAll():Observable<any>{
    return this.http.delete(this.recipeUrl);
  }
  findByName(recipe_name:string):Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${this.recipeUrl}?name=${recipe_name}`);
  }
  getImage(id:number):Observable<any>{
    return this.http.get(`${this.recipeUrl}/${id}/image`);
  }
  postImage(id:number,data:any):Observable<any>{
    return this.http.post(`${this.recipeUrl}/${id}/image`,data);
  }
}
