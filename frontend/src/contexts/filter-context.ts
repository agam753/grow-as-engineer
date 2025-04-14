import { createContext } from "react";
import { FilterContextState } from "@/interfaces/FilterState";

const defaultFilterContextValue: FilterContextState = {
  filterState: {
    jobType: [],
    experience: {
      min: "",
      max: "",
    },
    salary: {
      min: "",
      max: "",
    },
    domain: [],
  },
  appliedFilterCount: 0,
  dispatch: () => {
    throw new Error("Dispatch must be used within FilterProvider");
  },
};

export const FilterContext = createContext<FilterContextState>(
  defaultFilterContextValue
);
