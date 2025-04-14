const BASE_URL = "http://localhost:8000";

const request = async (method: string, pathname: string, body?: any) => {
  const url = `${BASE_URL}${pathname}`;
  const options: RequestInit = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to ${method} data`);
  }

  const data = await response.json();
  return data;
};

export const getRequest = (pathname: string) => request("GET", pathname);
export const postRequest = (pathname: string, body: any) =>
  request("POST", pathname, body);
export const putRequest = (pathname: string, body: any) =>
  request("PUT", pathname, body);
export const delRequest = (pathname: string) => request("DELETE", pathname);
