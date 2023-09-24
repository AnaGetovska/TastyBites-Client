import ICategoryModel from "./ICategoryModel";

export default interface ICategoryFilter {
  key?: string;
  title: string;
  categories: ICategoryModel[];
}
