"use client";
import ToggleButton from "./ToggleButton";
import MultiSelect from "./MultiSelect";
import { useFilter } from "@/contexts/FilterProvider";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, ListFilter } from "lucide-react";
import MinMaxFilter from "./MinMaxFilter";

const JobFilters = () => {
  const { filterState, dispatch, appliedFilterCount } = useFilter();
  return (
    <>
      {/* Mobile View */}
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className={`${appliedFilterCount && "text-mygreen"}`}
            >
              <ListFilter size="small" className="mr-2" />
              <span className="text-md">
                {appliedFilterCount > 0
                  ? `Filters (${appliedFilterCount})`
                  : "Apply Filters"}
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex justify-between my-6">
              <h2 className="text-lg font-semibold my-2">
                Filters{" "}
                <span className="text-md text-mygreen">
                  {appliedFilterCount > 0 ? `(${appliedFilterCount})` : ""}
                </span>
              </h2>
              {appliedFilterCount > 0 && (
                <div className="flex justify-center">
                  <Button
                    variant={"ghost"}
                    className="capitalize text-destructive hover:text-destructive my-1"
                    onClick={() => dispatch({ type: "RESET_FILTERS" })}
                  >
                    <Trash2 size="large" />
                  </Button>
                </div>
              )}
            </div>
            <div className="my-6">
              <h2 className="text-md font-bold">Job Type</h2>
              <ToggleButton name="Full Time" value="fulltime" />
              <ToggleButton name="Internship" value="internship" />
            </div>
            {/* Experience Filter List */}
            <MinMaxFilter
              heading="experience"
              type="EXP"
              filterValues={process.env.EXP_FILTER_VALUES?.split(",") || []}
              minValue={filterState.experience.min}
              maxValue={filterState.experience.max}
            />
            {/* Salary Filter List */}
            <MinMaxFilter
              type="SALARY"
              heading="salary (LPA)"
              filterValues={process.env.SALARY_FILTER_VALUES?.split(",") || []}
              minValue={filterState.salary.min}
              maxValue={filterState.salary.max}
            />
            <div className="my-6">
              <h2 className="text-md font-bold my-2">Domain</h2>
              <MultiSelect />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block w-1/4 p-4 rounded-md shadow-custom border max-h-max">
        <div className="flex justify-between mb-4">
          <div className="flex align-middle">
            <h2 className="text-2xl ml-1.5">
              Filters{" "}
              <span className="text-xl font-semibold text-mygreen">
                {appliedFilterCount > 0 ? `(${appliedFilterCount})` : ""}
              </span>
            </h2>
          </div>
          <Button
            variant={"ghost"}
            className="capitalize text-destructive hover:text-destructive"
            onClick={() => dispatch({ type: "RESET_FILTERS" })}
          >
            <Trash2 size="small" />
          </Button>
        </div>
        <div className="my-6">
          <h2 className="text-md font-bold">Job Type</h2>
          <ToggleButton name="Full Time" value="fulltime" />
          <ToggleButton name="Internship" value="internship" />
        </div>
        {/* Experience Filter List */}
        <MinMaxFilter
          heading="experience"
          type="EXP"
          filterValues={process.env.EXP_FILTER_VALUES?.split(",") || []}
          minValue={filterState.experience.min}
          maxValue={filterState.experience.max}
        />
        {/* Salary Filter List */}
        <MinMaxFilter
          type="SALARY"
          heading="salary (LPA)"
          filterValues={process.env.SALARY_FILTER_VALUES?.split(",") || []}
          minValue={filterState.salary.min}
          maxValue={filterState.salary.max}
        />
        <div className="my-6">
          <h2 className="text-md font-bold my-2">Domain</h2>
          <MultiSelect />
        </div>
      </div>
    </>
  );
};

export default JobFilters;
