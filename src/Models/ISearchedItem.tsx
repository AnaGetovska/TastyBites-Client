import IArangoDocument from "./IArangoDocument";

export default interface ISearchedItem extends IArangoDocument {
  name: string;
}
