"use client";

import DashboardJobItem from "./DashboardJobItem";
import { Card } from "@/components/ui/card";
import { Job } from "@/interfaces/Job";

const DashboardJobList: React.FC<{ jobs: Array<Job> }> = ({ jobs }) => {
  return (
    <Card className="rounded-md">
      <ul>
        {jobs.map((job) => (
          <DashboardJobItem key={job._id} data={job} />
        ))}
      </ul>
    </Card>
  );
};

export default DashboardJobList;
