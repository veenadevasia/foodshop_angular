export class Ingredients{

   public IngredientName:string;
  public  quantity:number;

    constructor(iname:string,qty:number)
    {
        this.IngredientName=iname;
        this.quantity=qty;
    }
}