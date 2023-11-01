import { CategoryType } from "./CategoryType";
import IArangoDocument from "./IArangoDocument";

export default interface IIngredientRequest {
  _key: string;
  name: string;
  quantity: string;
  measurementUnit: string;
}
