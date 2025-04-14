"use client";
import { useEffect, useState } from "react";
import { Job } from "@/interfaces/Job";
import { JobCard } from "./JobCard";
import { getJobList } from "@/helpers/userHttpHelper";
import { useFilter } from "@/contexts/FilterProvider";
import { FilterStateQueryParams } from "@/interfaces/FilterState";

const JobsList = () => {
  const [jobs, setJobs] = useState<Array<Job>>([]);
  const { filterState } = useFilter();

  useEffect(() => {
    const getJobs = async () => {
      try {
        console.log("Fetching job data");
        const { jobList } = await getJobList(
          FilterStateQueryParams(filterState)
        );
        setJobs(jobList);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    getJobs();
  }, [filterState]);
  return (
    <div className="joblist flex flex-col gap-4 md:w-3/4">
      {jobs.map((job, index) => (
        <JobCard
          isCraousalJob={false}
          key={job._id && job._id + index}
          job={job}
        />
      ))}
    </div>
  );
};

export default JobsList;
