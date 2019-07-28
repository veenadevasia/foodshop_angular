import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import {Recipe} from '../recipe.model';
import { RecipeService } from '../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
 
})
export class RecipeListComponent implements OnInit,OnDestroy {

  recipes:Recipe[];
  subscribe:Subscription;

//@Output() recipeWasSelected=new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService,private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
   
  this.subscribe= this.recipeService.recipeChanged.subscribe(
     (myrecipe:Recipe[])=>{
       this.recipes=myrecipe;
    });
   
    this.recipes=this.recipeService.getRecipes();
  }
 
  onNewRecipe()
  {
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  ngOnDestroy()
  {
    this.subscribe.unsubscribe();
  }

}
