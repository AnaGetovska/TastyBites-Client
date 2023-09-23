import { FilterContext } from "../Context/FilterContext";
import { useContext } from "react";

export default function useFilter() {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("useFilter must be used within an FilterProvider");
  }

  return context;
}
