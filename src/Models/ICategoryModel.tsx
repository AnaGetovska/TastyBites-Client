import { CategoryType } from "./CategoryType";
import IArangoDocument from "./IArangoDocument";

export default interface ICategoryModel extends IArangoDocument {
  name: string;
  type: CategoryType;
  description: string;
}
