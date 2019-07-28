import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import{ NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit,OnDestroy 
{
subscription:Subscription;
editMode =false;
editItemIndex:number;
editItem:Ingredients;
@ViewChild('f') slForm:NgForm;
constructor(private slService:ShoppingListService)
 { }

  ngOnInit() 
  {
this.subscription=this.slService.startedEditing.subscribe(
(index:number)=>{
this.editItemIndex=index;
this.editMode=true;
this.editItem=this.slService.getIngredient(index);
this.slForm.setValue(
  {
    name:this.editItem.IngredientName,
    amount:this.editItem.quantity
  }
);
}  
  );
  }

  onSubmit(form:NgForm)
  {
  const value=form.value;
  const newIngredient=new Ingredients(value.name,value.amount);
if(this.editMode)
{
this.slService.updateIngredient(this.editItemIndex,newIngredient);
}
else
{
  this.slService.addIngredient(newIngredient);
}
this.editMode=false;
form.reset();
}

onDelete()
{
  this.slService.deleteIngredient(this.editItemIndex);
  this.onClear();
}

onClear()
{
  this.slForm.reset();
  this.editMode=false;
}

ngOnDestroy()
{
  this.subscription.unsubscribe();
}

}
