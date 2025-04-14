"use client";
import DashboardJobList from "@/components/shared/dashboard/DashboardJobList";
import DashboardJobModel from "@/components/shared/dashboard/DashboardJobModel";
import { Button } from "@/components/ui/button";
import { Job } from "@/interfaces/Job";
import { useState } from "react";

const jobList: Array<Job> = [
  {
    jobId: "121323",
    title: "Job 1",
    location: "Bangalore",
    jobType: "Full Time",
    salary: "10-20LPA",
    experience: "2+ years",
    domain: "Backend",
    postingDate: "2024-12-26",
  },
  {
    jobId: "121324",
    title: "Job 1",
    location: "Bangalore",
    jobType: "Full Time",
    salary: "10-20LPA",
    experience: "2+ years",
    domain: "Backend",
    postingDate: "2024-12-26",
  },
];
function Jobs() {
  const [jobs, setJobs] = useState<Array<Job>>(jobList);
  // setJobs(jobList);
  return (
    <div className="px-20">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold capitalize my-4">
          Jobs{` (${jobs.length})`}
        </h1>
        <DashboardJobModel title="Add Job" isEdit={false}>
          <Button variant={"outline"}>Add Job</Button>
        </DashboardJobModel>
      </div>
      <DashboardJobList jobs={jobs} />
    </div>
  );
}

export default Jobs;
