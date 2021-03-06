import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class DataStorageService
{
constructor(private http:Http, private recipeService:RecipeService,private authService:AuthService){}

storeRecipe()
{
    const token=this.authService.getToken();
    return this.http.put('https://ang-recipebook1993.firebaseio.com/recipes.json?auth='+token,this.recipeService.getRecipes());
}

getRecipes()
{
    const token=this.authService.getToken();
    this.http.get('https://ang-recipebook1993.firebaseio.com/recipes.json?auth='+token)
    .map((response:Response)=>{
        const recipes:Recipe[]=response.json();  //json object (response) to javascript conversion
        for(let recipe of recipes)
        {
            if(!recipe['ingredients'])
            {
                recipe['ingredients']=[];
                console.log(recipe);
            }
        }
        return recipes;
    }).
    subscribe((recipes:Recipe[])=>{
        this.recipeService.setRecipes(recipes);
        
    });  
}
}




