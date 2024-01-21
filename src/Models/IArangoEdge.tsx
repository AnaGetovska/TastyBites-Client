import IArangoDocument from "./IArangoDocument";

export default interface IArangoEdge extends IArangoDocument {
  _from: string;
  _to: string;
}
