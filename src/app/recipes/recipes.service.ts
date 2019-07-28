import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
      
   private recipes:Recipe[]=[
        new Recipe('Fish curry', 'Spicy and Tasty',
        'https://www.bestiefood.com/wp-content/uploads/2019/02/fish-curry-recipe-1024x500.jpg',
        [new Ingredients('red hlli',10)]),
        new Recipe('Sambar', 'Delicious',
        'http://healthykeralam.com/wp-content/uploads/2016/02/sambarr-2.jpg',
        [new Ingredients('potato',3)])   
      ];


recipeChanged=new Subject<Recipe[]>();

constructor(private slService:ShoppingListService)
{
      
}
//to set firebase recipe data to class level recipe variable (fetching)
setRecipes(recipes:Recipe[])
{
      this.recipes=recipes;
      this.recipeChanged.next(this.recipes.slice());
}

      getRecipes()
      {
          return this.recipes.slice();
      }
getRecipe(index:number)
{
      return this.recipes[index];
}
     

      addIngredientToShoppingList(ingredients:Ingredients[])
      {
this.slService.addIngredients(ingredients);
      }


addRecipe(recipe:Recipe)
{
this.recipes.push(recipe);
this.recipeChanged.next(this.recipes.slice());
}

updateRecipe(index:number,newrecipe:Recipe)
{
this.recipes[index]=newrecipe;
this.recipeChanged.next(this.recipes.slice());
}

deleteRecipe(index:number)
{
this.recipes.splice(index,1);
this.recipeChanged.next(this.recipes.slice());
}
}