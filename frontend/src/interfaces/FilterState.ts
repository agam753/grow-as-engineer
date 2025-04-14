export type FilterState = {
  jobType: Array<string>;
  experience: { min: string; max: string };
  salary: { min: string; max: string };
  domain: Array<string>;
};

export const FilterStateQueryParams = (filters: FilterState): string => {
  const params = new URLSearchParams();

  if (filters.jobType) {
    filters.jobType.forEach((type) => params.append("jobType", type));
  }
  if (filters.experience) {
    if (filters.experience.min) params.append("minExp", filters.experience.min);
    if (filters.experience.max) params.append("maxExp", filters.experience.max);
  }
  if (filters.salary) {
    if (filters.salary.min) params.append("minSalary", filters.salary.min);
    if (filters.salary.max) params.append("maxSalary", filters.salary.max);
  }
  if (filters.domain.length) {
    filters.domain.forEach((domain) => params.append("domain", domain));
  }

  return params.toString();
};

export type FilterAction =
  | { type: "SET_JOBTYPE"; payload: Array<string> }
  | { type: "SET_MIN_EXP"; payload: string }
  | { type: "SET_MAX_EXP"; payload: string }
  | { type: "SET_MIN_SALARY"; payload: string }
  | { type: "SET_MAX_SALARY"; payload: string }
  | { type: "SET_DOMAIN"; payload: Array<string> }
  | { type: "RESET_FILTERS" };

export type FilterContextState = {
  filterState: FilterState;
  dispatch: React.Dispatch<FilterAction>;
  appliedFilterCount: number;
};
