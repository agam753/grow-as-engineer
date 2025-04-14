const BASE_URL = `http://${process.env.BACKEND_HOSTNAME}:${process.env.BACKEND_PORT}`;

export const getJobList = async (params?: string) => {
  const url = `${BASE_URL}/jobs${params ? `?${params}` : ""}`;
  console.log(url);
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to get all jobs data`);
  }

  const data = await response.json();
  return { jobList: data.data, jobCount: data.totalCount };
};

export const getJobById = async (jobId: string) => {
  const url = `${BASE_URL}/jobs/${jobId}`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};
