import { CategoryType } from "./CategoryType";
import IArangoDocument from "./IArangoDocument";
import IIngredientRequest from "./IIngredientRequest";
import { IRecipeModel } from "./IRecipeModel";

export default interface IRecipeRequest extends IRecipeModel {
  ingredients: IIngredientRequest[];
  categoriesKeys: string[];
  allergensKeys: string[];
  images?: string;
}
