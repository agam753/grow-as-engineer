export interface Job {
  _id?: string;
  title: string;
  jobLocation: string;
  companyName: string;
  salary: string;
  experience: string;
  domain: string;
  jobType: string;
  postingDate: string;
  postedBy?: string;
  jobDetails: {
    aboutJob: string;
    aboutRole: string;
    aboutCompany: string;
    requirements: string;
    jobLink: string;
    jobThumbnail: string;
  };
  views?: number;
}
