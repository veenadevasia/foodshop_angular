import { Ingredients } from '../shared/ingredient.model';

export class Recipe
{
public name:string;
public description:string;
public imagePath:string;
public ing:Ingredients[];

constructor(nm:string,ds:string,ip:string,private i:Ingredients[])
{
this.name=nm;
this.description=ds;
this.imagePath=ip;
this.ing=i;
}
}