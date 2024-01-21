import { DayEnum } from "./DayEnum";
import IArangoEdge from "./IArangoEdge";

export default interface IInMenuModel extends IArangoEdge {
  day: DayEnum;
}
