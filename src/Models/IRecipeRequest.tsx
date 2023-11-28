import { CategoryType } from "./CategoryType";
import IArangoDocument from "./IArangoDocument";
import ICategoryModel from "./ICategoryModel";
import IIngredientRequest from "./IIngredientRequest";
import { IRecipeModel } from "./IRecipeModel";

export default interface IRecipeRequest extends IRecipeModel {
  ingredients: IIngredientRequest[];
  categories: ICategoryModel[] | undefined;
  allergensKeys: string[];
  images?: string;
}
