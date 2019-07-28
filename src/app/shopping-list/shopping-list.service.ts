import { Ingredients } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService
{
 private   ingredients:Ingredients[]=[
        new Ingredients('potato',5),
        new Ingredients('tomato',3),
        new Ingredients('apple',4)
        
        ];
 ingredientsChanged=new Subject<Ingredients[]>();
startedEditing=new Subject<number>();

        getIngredients()
        {
            return this.ingredients.slice();
        }
        getIngredient(index:number)
        {
return this.ingredients[index];
        }
addIngredient(ingredient:Ingredients)
{

this.ingredients.push(ingredient);

this.ingredientsChanged.next(this.ingredients.slice());
}

addIngredients(ingredients:Ingredients[])
{

this.ingredients.push(...ingredients);

this.ingredientsChanged.next(this.ingredients.slice());
}
updateIngredient(index:number,newingredient:Ingredients)
{
    this.ingredients[index]=newingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
}

deleteIngredient(index:number)
{
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next( this.ingredients.slice());
}
    }