"use client";
import React, { useContext, useReducer, useEffect } from "react";
import {
  FilterAction,
  FilterContextState,
  FilterState,
} from "@/interfaces/FilterState";
import { FilterContext } from "./filter-context";

const min_exp = `${process.env.EXP_FILTER_VALUES?.split(",").at(0)}`;
const max_exp = `${process.env.EXP_FILTER_VALUES?.split(",").at(-1)}`;
const min_salary = `${process.env.SALARY_FILTER_VALUES?.split(",").at(0)}`;
const max_salary = `${process.env.SALARY_FILTER_VALUES?.split(",").at(-1)}`;
// initial filter state
const initialFilterState: FilterState = {
  jobType: [],
  experience: {
    min: min_exp,
    max: max_exp,
  },
  salary: {
    min: min_salary,
    max: max_salary,
  },
  domain: [],
};

// Reducer function
const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SET_JOBTYPE":
      return { ...state, jobType: action.payload };
    case "SET_MIN_EXP":
      return {
        ...state,
        experience: { ...state.experience, min: action.payload },
      };
    case "SET_MAX_EXP":
      return {
        ...state,
        experience: { ...state.experience, max: action.payload },
      };
    case "SET_MIN_SALARY":
      return { ...state, salary: { ...state.salary, min: action.payload } };
    case "SET_MAX_SALARY":
      return { ...state, salary: { ...state.salary, max: action.payload } };
    case "SET_DOMAIN":
      return { ...state, domain: action.payload };
    case "RESET_FILTERS":
      return initialFilterState;
  }
};

const countAppliedFilters = (filterState: FilterState): number => {
  let count = filterState.jobType.length + filterState.domain.length;
  if (
    filterState.experience.min !== min_exp ||
    filterState.experience.max !== max_exp
  )
    count++;
  if (
    filterState.salary.min !== min_salary ||
    filterState.salary.max != max_salary
  )
    count++;
  return count;
};

const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filterState, dispatch] = useReducer(
    filterReducer,
    initialFilterState,
    (initial) => {
      if (typeof window !== "undefined") {
        const savedState = localStorage.getItem("filterState");
        return savedState ? JSON.parse(savedState) : initial;
      }
      return initial;
    }
  );

  useEffect(() => {
    localStorage.setItem("filterState", JSON.stringify(filterState));
  }, [filterState]);

  const appliedFilterCount = countAppliedFilters(filterState);
  return (
    <FilterContext.Provider
      value={{ filterState, dispatch, appliedFilterCount }}
    >
      {children}
    </FilterContext.Provider>
  );
};
const useFilter = (): FilterContextState => useContext(FilterContext);

export { FilterProvider, useFilter };
