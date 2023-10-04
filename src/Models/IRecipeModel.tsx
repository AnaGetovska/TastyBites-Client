import IArangoDocument from "./IArangoDocument";

export interface IRecipeModel extends IArangoDocument {
  name: string;
  preparationTime: number;
  portions: number;
  description: string;
  displayImage: string;
}
