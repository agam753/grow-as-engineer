"use client";
import { useFilter } from "@/contexts/FilterProvider";
import { Switch } from "./ui/switch";

const ToggleButton: React.FC<{ name: string; value: string }> = ({
  name,
  value,
}) => {
  const {
    filterState: { jobType },
    dispatch,
  } = useFilter();
  const switchToggleHandler = (isChecked: boolean) => {
    const newJobType = jobType.filter((type) => type !== value);
    if (isChecked) newJobType.push(value);
    dispatch({ type: "SET_JOBTYPE", payload: newJobType });
  };
  return (
    <div className="border-2 flex justify-between px-4 py-2 my-2 rounded-md">
      <h2 className="text-sm">{name}</h2>
      <Switch
        value={value}
        checked={jobType.filter((type) => type === value).length > 0}
        onCheckedChange={switchToggleHandler}
      />
    </div>
  );
};

export default ToggleButton;
