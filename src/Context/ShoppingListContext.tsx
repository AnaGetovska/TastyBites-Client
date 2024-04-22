import React from "react";
import { useState } from "react";
import IShoppingListItem from "../Models/IShoppingListItem";

export interface IShoppingListContext {
  products: IShoppingListItem[];
  setProducts: Function;
  clearProducts: Function;
  addShoppingItem: Function;
  removeShoppingItem: Function;
}

const ShoppingListContext = React.createContext<IShoppingListContext>({
  products: [],
  setProducts: (filter: IShoppingListItem[]) => console.warn("no products"),
  clearProducts: () => console.warn("no products"),
  addShoppingItem: () => console.warn("no products"),
  removeShoppingItem: () => console.warn("no products"),
});

const ShoppingListProvider = ({ children }: { children?: React.ReactNode }) => {
  const getProducts = (): IShoppingListItem[] => {
    const productsString = localStorage.getItem("products");
    if (!productsString || productsString === "undefined") {
      return [];
    }
    return productsString ? JSON.parse(productsString) : null;
  };
  const [products, setProducts] = useState<IShoppingListItem[]>(getProducts());

  const saveProducts = (newProducts: IShoppingListItem[]) => {
    localStorage.setItem("products", JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  const clearProducts = () => {
    localStorage.removeItem("products");
    setProducts([]);
  };

  const addShoppingItem = (item: IShoppingListItem) => {
    const index = products.indexOf(item);
    if (index !== -1) {
      return;
    }
    let newProducts = getProducts();
    newProducts.push(item);
    saveProducts(newProducts);
  };

  const removeShoppingItem = (item: IShoppingListItem) => {
    const index = products.indexOf(item);
    if (index === -1) {
      return;
    }
    let newProducts = getProducts();
    newProducts.splice(index, 1);
    saveProducts(newProducts);
  };
  return (
    <ShoppingListContext.Provider
      value={{
        setProducts: saveProducts,
        clearProducts,
        products,
        addShoppingItem,
        removeShoppingItem,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export { ShoppingListContext, ShoppingListProvider };
