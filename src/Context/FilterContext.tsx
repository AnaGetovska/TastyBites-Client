import React, { ReactNode } from "react";
import { useState } from "react";

export interface IFilterContext {
  filter: string[];
  setFilter: Function;
  clearFilter: Function;
  addKey: Function;
  removeKey: Function;
}

const FilterContext = React.createContext<IFilterContext>({
  filter: [],
  setFilter: (filter: string[]) => console.warn("no filtered categories"),
  clearFilter: () => console.warn("no filtered categories"),
  addKey: () => console.warn("no filtered categories"),
  removeKey: () => console.warn("no filtered categories"),
});

const FilterProvider = ({ children }: { children?: React.ReactNode }) => {
  const getFilter = (): string[] => {
    const filterString = localStorage.getItem("filterBy");
    if (!filterString || filterString === "undefined") {
      return [];
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
    setFilter([]);
  };

  const addKey = (key: string) => {
    const index = filter.indexOf(key);
    if (index !== -1) {
      return;
    }
    let newFilter = getFilter();
    newFilter.push(key);
    saveFilter(newFilter);
  };

  const removeKey = (key: string) => {
    const index = filter.indexOf(key);
    if (index === -1) {
      return;
    }
    let newFilter = getFilter();
    newFilter.splice(index, 1);
    saveFilter(newFilter);
  };
  return (
    <FilterContext.Provider
      value={{
        setFilter: saveFilter,
        clearFilter,
        filter,
        addKey,
        removeKey,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
