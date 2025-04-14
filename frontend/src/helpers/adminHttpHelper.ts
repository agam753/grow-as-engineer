import { Job } from "@/interfaces/Job";

const BASE_URL = `http://${process.env.BACKEND_HOSTNAME}:${process.env.BACKEND_PORT}`;

export const postJob = async (job: Job) => {
  const url = `${BASE_URL}/jobs`;
  console.log(url);
  const options: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  };

  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const putJob = async (job: Job) => {
  const url = `${BASE_URL}/jobs/${job._id}`;
  const options: RequestInit = {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  };

  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const deleteJob = async (jobId: string) => {
  const url = `${BASE_URL}/jobs/${jobId}`;
  const options: RequestInit = {
    method: "DELETE",
    credentials: "include",
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

export const userLogin = async (email: string, password: string) => {
  const url = `${BASE_URL}/users/login`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};
