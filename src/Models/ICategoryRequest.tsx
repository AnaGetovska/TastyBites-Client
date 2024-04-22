import { CategoryType } from "./CategoryType";

export default interface ICategoryRequest {
  _key: string;
  name: string;
  type: CategoryType;
  description: string;
}
