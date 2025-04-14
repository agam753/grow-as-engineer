import { Button } from "@/components/ui/button";
import DashboardJobModel from "./DashboardJobModel";
import { Job } from "@/interfaces/Job";
const DashboardJobItem: React.FC<{ data: Job }> = ({ data }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg border-b">
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{data.title}</span>
        <span className="text-sm text-gray-500">{data._id}</span>
      </div>
      <div className="flex space-x-2">
        <DashboardJobModel title="Edit Job" isEdit={true} jobId={data._id}>
          <Button
            variant={"ghost"}
            className="px-4 py-2 capitalize border border-gray-300 rounded-md"
          >
            Edit
          </Button>
        </DashboardJobModel>
        <Button
          variant={"destructive"}
          className="px-4 py-2 capitalize border border-red-500 rounded-md"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DashboardJobItem;
