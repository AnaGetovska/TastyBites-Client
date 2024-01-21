import { ShoppingListContext } from "../Context/ShoppingListContext";
import { useContext } from "react";

export default function useProducts() {
  const context = useContext(ShoppingListContext);

  if (!context) {
    throw new Error("useFilter must be used within an FilterProvider");
  }

  return context;
}
