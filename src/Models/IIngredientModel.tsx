import IArangoDocument from "./IArangoDocument";

export default interface IIngredientModel extends IArangoDocument {
  name: string;
  description: string;
}
