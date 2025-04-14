/** @type {import('next').NextConfig} */
const nextConfig = {
  // takig images from pexels
  images: {
    domains: ["images.pexels.com", "1000logos.net"],
  },
  env: {
    BACKEND_HOSTNAME: "localhost",
    BACKEND_PORT: "8000",
    SALARY_FILTER_VALUES: "0,5,10,15,20,30,40,50,50+",
    EXP_FILTER_VALUES: "0,2,4,6,8,10,10+",
    CROUSAL_COMPANIES: "Facebook,Google,Amazon,Microsoft,Apple",
  },
};

export default nextConfig;
