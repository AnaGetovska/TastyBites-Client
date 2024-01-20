import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./Context/AuthContext";
import { FilterProvider } from "./Context/FilterContext";
import { ShoppingListProvider } from "./Context/ShoppingListContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Styles/dihjauti.otf";
import "./Styles/dihjauti.bold-italic.otf";
import "./Styles/dihjauti.s-bold.otf";
import "./Styles/dihjauti.s-italic.otf";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <FilterProvider>
      <ShoppingListProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={
                <ChakraProvider>
                  <App />
                </ChakraProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </ShoppingListProvider>
    </FilterProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
