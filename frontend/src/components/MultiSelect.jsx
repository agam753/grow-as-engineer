"use client";
import { useFilter } from "@/contexts/FilterProvider";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const domainOptions = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "uiux", label: "UI/UX" },
];

const selectStyle = {
  control: () => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    outline: "none",
    border: "2px solid hsl(var(--accent))",
    borderRadius: 4,
    padding: "2px 0px",
    backgroundColor: "hsl(var(--background))",
    color: "hsl(var(--foreground))",
    boxShadow:
      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
  }),
  input: (base) => ({
    ...base,
    color: "hsl(var(--foreground))",
  }),
  placeholder: (base) => ({
    ...base,
    color: "hsl(var(--foreground))",
    fontSize: "14px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "hsl(var(--background))",
    border: "2px solid hsl(var(--accent))",
    borderRadius: 4,
  }),
  menuList: (provided) => ({
    ...provided,
    padding: "0",
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: state.isFocused
      ? "hsl(var(--accent))"
      : "hsl(var(--background))",
    color: "hsl(var(--foreground))",
    transition: "background-color 0.2s ease",
    ":active": {
      backgroundColor: "hsl(var(--accent))",
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "hsl(var(--my-green))",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white",
    fontSize: "12px",
    padding: "2px",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "white",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
    },
  }),
};

export default function MultiSelect() {
  const {
    dispatch,
    filterState: { domain },
  } = useFilter();
  const domainStr = domain.join(",");
  const inputChangeHandler = (selectedValues) => {
    const domain = selectedValues.map((sv) => sv.value);
    dispatch({ type: "SET_DOMAIN", payload: domain });
  };
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={domainOptions}
      styles={selectStyle}
      onChange={inputChangeHandler}
      value={domainOptions.filter((opt) => domainStr.includes(opt.value))}
    />
  );
}
