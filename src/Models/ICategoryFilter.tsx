import ICategoryModel from "./ICategoryModel";

export default interface ICategorySidebar {
  key?: string;
  title: string;
  categories: ICategoryModel[];
}
