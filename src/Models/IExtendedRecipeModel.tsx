import IArangoDocument from "./IArangoDocument";
import ICategoryModel from "./ICategoryModel";
import IIngredientModel from "./IIngredientModel";
import { IRecipeModel } from "./IRecipeModel";

export interface IExtendedRecipeModel extends IRecipeModel {
  images: string[];
  allergens: string[];
  categories: ICategoryModel[];
  ingredients: IIngredientModel[];
  rating: number;
  ratingCount: number;
  likedBy: boolean;
}
