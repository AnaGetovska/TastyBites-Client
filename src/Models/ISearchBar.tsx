import ISearchedItem from "./ISearchedItem";

export default interface ISearchBar {
  label: string;
  pholder: string;
  onChange: Function;
  color?: string;
  bg?: string;
}
