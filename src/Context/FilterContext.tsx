import React, { ReactNode } from "react";
import { useState } from "react";

export interface IFilterContext {
  filter: string[] | null;
  setFilter: Function;
  clearFilter: Function;
}

const FilterContext = React.createContext<IFilterContext>({
  filter: null,
  setFilter: (filter: string[]) => console.warn("no filtered categories"),
  clearFilter: () => console.warn("no filtered categories"),
});

const FilterProvider = ({ children }: { children?: React.ReactNode }) => {
  const getFilter = (): string[] | null => {
    const filterString = localStorage.getItem("filterBy");
    if (!filterString || filterString === "undefined") {
      return null;
    }
    return filterString ? JSON.parse(filterString) : null;
  };
  const [filter, setFilter] = useState(getFilter());

  const saveFilter = (newFilter: string[]) => {
    localStorage.setItem("filterBy", JSON.stringify(newFilter));
    setFilter(newFilter);
  };

  const clearFilter = () => {
    localStorage.removeItem("filterBy");
    setFilter(null);
  };
  return (
    <FilterContext.Provider
      value={{
        setFilter: saveFilter,
        clearFilter,
        filter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
