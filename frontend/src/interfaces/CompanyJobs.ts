import { Job } from "./Job";

export interface CompanyJobs {
  company: string;
  openings: Job[];
  companyImg: string;
}
