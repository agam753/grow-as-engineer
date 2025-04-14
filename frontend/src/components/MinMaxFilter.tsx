import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { useFilter } from "@/contexts/FilterProvider";

const MinMaxFilter: React.FC<{
  heading: string;
  filterValues: Array<string>;
  type: string;
  minValue: string;
  maxValue: string;
}> = ({ heading, filterValues, type, minValue, maxValue }) => {
  const { dispatch } = useFilter();
  const minValueChangeHandler = (value: string) => {
    dispatch({ type: `SET_MIN_${type as "EXP" | "SALARY"}`, payload: value });
  };
  const maxValueChangeHandler = (value: string) => {
    dispatch({ type: `SET_MAX_${type as "EXP" | "SALARY"}`, payload: value });
  };
  return (
    <div className="my-8">
      <h2 className="text-md font-bold capitalize">{heading}</h2>
      <div className="flex my-2 rounded-md justify-between">
        <Select value={minValue} onValueChange={minValueChangeHandler}>
          <SelectTrigger className="mr-2 focus:outline-none focus:ring-0 focus:ring-offset-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {filterValues.map(
              (value, index) =>
                parseInt(value) < parseInt(maxValue) && (
                  <SelectItem key={index} value={value}>
                    {value}
                  </SelectItem>
                )
            )}
          </SelectContent>
        </Select>
        <Select value={maxValue} onValueChange={maxValueChangeHandler}>
          <SelectTrigger className="ml-2 focus:outline-none focus:ring-0 focus:ring-offset-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {filterValues.map(
              (value, index) =>
                parseInt(value) > parseInt(minValue) && (
                  <SelectItem key={index} value={value}>
                    {value}
                  </SelectItem>
                )
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MinMaxFilter;
