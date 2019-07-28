import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredients } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
id:number;
  recipeForm:FormGroup;
editMode=false;
  constructor(private route:ActivatedRoute, 
    private recipeService:RecipeService,
    private router:Router) { }

  ngOnInit() {
this.route.params.subscribe((params:Params)=>
{
  this.id=+params['id'];
  this.editMode=params['id']!=null;
  this.initForm();
})
  }
  private initForm()
  {
let recipeName='';
let recipeImagePath='';
let recipeDescription='';
let recipeIngredients=new FormArray([]);
 if(this.editMode)
 {
   const recipe=this.recipeService.getRecipe(this.id);
   recipeName=recipe.name;
   recipeImagePath=recipe.imagePath;
   recipeDescription=recipe.description;
   if(recipe['ing'])
   {
     for(let ingredient of recipe.ing)
     {
       recipeIngredients.push(
         new FormGroup({
           'IngredientName':new FormControl(ingredient.IngredientName,Validators.required),
           'quantity':new FormControl(ingredient.quantity,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
         })
       )
     }
   }
 }
 this.recipeForm=new FormGroup({
'name':new FormControl(recipeName,Validators.required),
'imagePath':new FormControl(recipeImagePath,Validators.required),
'description':new FormControl(recipeDescription,Validators.required),
'ingredients':recipeIngredients 
});

  }


  onAddIngredient()
  {
  
 (<FormArray> this.recipeForm.get('ingredients')).push(new FormGroup({
      'IngredientName':new FormControl(null,Validators.required),
      'quantity':new FormControl(null,[Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
  );
  }

onSubmit()
{
  console.log(this.recipeForm);
 const newRecipe=new Recipe(this.recipeForm.value['name'],
 this.recipeForm.value['description'],
 this.recipeForm.value['imagePath'],
 this.recipeForm.value['ingredients']);
 
 if(this.editMode)
{
  this.recipeService.updateRecipe(this.id,newRecipe);
}
else{
  this.recipeService.addRecipe(newRecipe);
}
this.onCancel();

}

onDeleteIngredient(index:number)
{
(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}


onCancel()
{
this.router.navigate(['../'],{relativeTo:this.route})
}



}
