import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

 recipe:Recipe;
 id:number;
  constructor(private recipeService:RecipeService,
    private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {

    this.route.params.subscribe(
(params:Params)=>{
this.id=+params['id'];
this.recipe=this.recipeService.getRecipe(this.id);

}
    );
  }
  onAddToShoppingList()
{
  this.recipeService.addIngredientToShoppingList(this.recipe.ing);
}

onEditRecipe()
{
this.router.navigate(['edit'],{relativeTo:this.route});
//(or)

//this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
}

onDeleteRecipe()
{
this.recipeService.deleteRecipe(this.id);
this.router.navigate(['/recipes']);
}


}
