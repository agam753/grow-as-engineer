"use client";
import JobSection from "@/components/JobSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getJobById } from "@/helpers/userHttpHelper";
import { Job } from "@/interfaces/Job";
import Link from "next/link";
import { useEffect, useState } from "react";

const initialJob: Job = {
  _id: "6771bc2bc5fc25675a9ffd75",
  title: "Senior engineer",
  jobLocation: "Noida",
  companyName: "Microsoft",
  salary: "10-20LPA",
  experience: "1-2 yrs",
  domain: "backend",
  jobType: "full time",
  postingDate: "2024-12-24T18:30:00.000Z",
  jobDetails: {
    aboutJob: "about",
    aboutRole: "role",
    aboutCompany: "comapny",
    requirements: "requirements",
    jobLink: "https://www.google.com",
    jobThumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  views: 0,
};
const JobPage = ({ params }: { params: { jobId: string } }) => {
  const [jobDetails, setJobDetails] = useState<Job>(initialJob);
  useEffect(() => {
    const fetchJob = async (_id: string) => {
      try {
        const data = await getJobById(_id);
        setJobDetails(data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
      }
    };

    fetchJob(params.jobId);
  }, [params.jobId]);

  return (
    <div className="flex-grow mx-6 md:mx-20">
      <span className="inline-block w-auto text-sm md:text-md">
        {new Date(jobDetails.postingDate).toDateString()}
      </span>
      <h1 className="font-bold capitalize text-lg md:text-2xl md:my-2">
        {`${jobDetails.title} | ${jobDetails.jobLocation}`}
      </h1>
      <div className="flex gap-4 my-2">
        <Badge variant="secondary">{jobDetails.salary}</Badge>
        <Badge variant="secondary">{jobDetails.experience}</Badge>
        <Badge variant="secondary">{jobDetails.jobType}</Badge>
        <Badge variant="secondary">{`${jobDetails.views} views`}</Badge>
      </div>
      <JobSection title="About Job" value={jobDetails.jobDetails.aboutJob} />
      <JobSection title="Your Role" value={jobDetails.jobDetails.aboutRole} />
      <JobSection
        title="Requirements"
        value={jobDetails.jobDetails.requirements}
      />
      <JobSection
        title="About Company"
        value={jobDetails.jobDetails.aboutCompany}
      />

      <Button
        className="my-6 font-bold md:py-4 md:px-6"
        variant={"destructive"}
      >
        <Link href={jobDetails.jobDetails.jobLink} target="_blank">
          Apply
        </Link>
      </Button>
    </div>
  );
};

export default JobPage;
