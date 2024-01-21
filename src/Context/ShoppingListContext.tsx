import React from "react";
import { useState } from "react";

export interface IShoppingListContext {
  products: string[];
  setProducts: Function;
  clearProducts: Function;
  addProductKey: Function;
  removeProductKey: Function;
}

const ShoppingListContext = React.createContext<IShoppingListContext>({
  products: [],
  setProducts: (filter: string[]) => console.warn("no products"),
  clearProducts: () => console.warn("no products"),
  addProductKey: () => console.warn("no products"),
  removeProductKey: () => console.warn("no products"),
});

const ShoppingListProvider = ({ children }: { children?: React.ReactNode }) => {
  const getProducts = (): string[] => {
    const productsString = localStorage.getItem("products");
    if (!productsString || productsString === "undefined") {
      return [];
    }
    return productsString ? JSON.parse(productsString) : null;
  };
  const [products, setProducts] = useState(getProducts());

  const saveProducts = (newProducts: string[]) => {
    localStorage.setItem("products", JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  const clearProducts = () => {
    localStorage.removeItem("products");
    setProducts([]);
  };

  const addProductKey = (key: string) => {
    const index = products.indexOf(key);
    if (index !== -1) {
      return;
    }
    let newProducts = getProducts();
    newProducts.push(key);
    saveProducts(newProducts);
  };

  const removeProductKey = (key: string) => {
    const index = products.indexOf(key);
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
        addProductKey,
        removeProductKey,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export { ShoppingListContext, ShoppingListProvider };
