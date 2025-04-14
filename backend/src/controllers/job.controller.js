import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError, ApiErrorResponse } from "../utils/ApiError.js";
import { Job } from "../models/job.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";
import { getPagination } from "../middlewares/pagination.middleware.js";

const isJobDataValid = ({
  title,
  jobLocation,
  companyName,
  salary,
  experience,
  domain,
  jobType,
  postingDate,
  jobDetails,
}) => {
  return [
    title,
    jobLocation,
    companyName,
    salary,
    experience,
    domain,
    jobType,
    postingDate,
    jobDetails,
  ].every(
    (field) =>
      field &&
      (typeof field == "string"
        ? field.trim() !== ""
        : Object.values(field).every((v) => v.trim() !== ""))
  );
};

const extractRange = (range) => {
  const match = range.match(/(\d+)\s*-\s*(\d+)/);
  if (match) {
    const min = parseInt(match[1], 10);
    const max = parseInt(match[2], 10);
    return { min, max };
  }
  return null;
};

const getRange = (range) => {
  return [
    parseInt(range[0]),
    range[1].includes("+") ? Number.MAX_VALUE : parseInt(range[1]),
  ];
};

const buildQueryObject = ({
  domain,
  company,
  minExp,
  maxExp,
  minSalary,
  maxSalary,
  jobType,
}) => {
  const query = {};

  if (domain) query.domain = domain;
  if (company) query.companyName = { $regex: new RegExp(company, "i") };
  if (jobType) query.jobType = jobType;

  if (minExp && maxExp && minSalary && maxSalary) {
    const [minExpValue, maxExpValue] = getRange([minExp, maxExp]);
    const [minSalaryValue, maxSalaryValue] = getRange([minSalary, maxSalary]);
    query.$expr = {
      $and: [
        {
          $lte: [
            { $max: [minExpValue, { $arrayElemAt: ["$expRange", 0] }] },
            { $min: [maxExpValue, { $arrayElemAt: ["$expRange", 1] }] },
          ],
        },
        {
          $lte: [
            { $max: [minSalaryValue, { $arrayElemAt: ["$salaryRange", 0] }] },
            { $min: [maxSalaryValue, { $arrayElemAt: ["$salaryRange", 1] }] },
          ],
        },
      ],
    };
  }

  return query;
};

const createJob = asyncHandler(async (req, res) => {
  const jobData = req.body;
  const salaryRange = extractRange(jobData.salary);
  const expRange = extractRange(jobData.experience);

  if (!isJobDataValid(jobData) || !salaryRange || !expRange) {
    console.log("All fields were not provided");
    return res.status(400).json(new ApiError(400, "All field are required"));
  }

  const {
    title,
    jobLocation,
    companyName,
    salary,
    experience,
    domain,
    jobType,
    postingDate,
    jobDetails,
  } = jobData;

  /**
   * salaryRange: 10-20LPA
   * experience: 2-3 years
   * store these in number format
   * minSalary = 10, maxSalary = 20
   * minExp = 2, maxExp = 3
   * would be easy while querying
   */

  try {
    const job = await Job.create({
      title,
      jobDetails,
      jobType,
      owner: req.user._id,
      experience,
      domain,
      jobLocation,
      companyName,
      salary,
      salaryRange: [salaryRange.min, salaryRange.max],
      expRange: [expRange.min, expRange.max],
      postingDate,
    });

    return res
      .status(201)
      .json(new ApiResponse(200, job, "Job created successfully!!"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiErrorResponse(500, error.message, false, [error]));
  }
});

const updateJobDetails = asyncHandler(async (req, res) => {
  const jobData = req.body;

  if (!isJobDataValid(jobData)) {
    return res.status(400).json(new ApiError(400, "All field are required"));
  }

  const {
    title,
    jobLocation,
    companyName,
    salaryRange,
    experience,
    domain,
    jobType,
    postingDate,
  } = jobData;
  const jobDetails = JSON.parse(jobData.jobDetails);

  // if (jobDetails) jobDetails = JSON.parse(jobDetails);

  // if (domains) domains = JSON.parse(domains);
  console.log(req.body, req.params);
  const { jobId } = req.params;

  // let thumbnailPath;

  // if (
  //   req.files &&
  //   typeof req.files == "object" &&
  //   req.files.thumbnail &&
  //   req.files.thumbnail.length > 0
  // ) {
  //   thumbnailPath = req.files.thumbnail[0].path;
  // }

  // const thumbnail = await uploadOnCloudinary(thumbnailPath);
  // console.log(req.files);

  const job = await Job.findByIdAndUpdate(
    jobId,
    {
      $set: {
        title,
        // thumbnail: thumbnail?.url || process.env.DEFAULT_JOB_THUMBNAIL_URL,
        jobDetails,
        jobType,
        // owner: req.user._id,
        experience,
        domain,
        jobLocation,
        companyName,
        salaryRange,
        postingDate,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, job, "Job details updated successfully!"));
});

const listJobs = asyncHandler(async (req, res) => {
  try {
    const query = buildQueryObject(req.query);
    const { startIndex, limit, totalDocuments } = await getPagination(
      Job,
      query,
      req.query
    );
    const jobList = await Job.find(query)
      .skip(startIndex)
      .limit(limit)
      .sort({ postingDate: -1 });
    return res
      .status(200)
      .json(
        new ApiResponse(200, jobList, "All Jobs informations", totalDocuments)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiErrorResponse(500, error.message, false, [error]));
  }
});

const getJobById = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  if (!isValidObjectId(jobId)) {
    return res.status(400).json(new ApiErrorResponse(400, "Invalid Job Id"));
  }
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res
        .status(404)
        .json(new ApiErrorResponse(404, "Job doesn't exist"));
    }
    return res.status(200).json(new ApiResponse(200, job, "Job information"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiErrorResponse(500, error.message, false, [error]));
  }
});

const deleteJobById = asyncHandler(async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res
        .status(404)
        .json(new ApiErrorResponse(404, "Job doesn't exist"));
    }
    await Job.deleteOne({ _id: jobId });
    return res.status(200).json(new ApiResponse(200, job, "Job Deleted"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiErrorResponse(500, error.message, false, [error]));
  }
});

export { createJob, updateJobDetails, listJobs, getJobById, deleteJobById };
