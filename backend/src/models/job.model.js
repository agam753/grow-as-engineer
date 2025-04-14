import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
    },
    companyName: {
      type: String,
    },
    salary: {
      type: String,
      default: "",
    },
    salaryRange: {
      type: [Number],
      default: [0, 0],
    },
    experience: {
      type: String,
      default: "",
    },
    expRange: {
      type: [Number],
      default: [0, 0],
    },
    domain: {
      type: String,
      default: "",
    },
    jobType: {
      type: String,
      required: true,
    },
    postingDate: {
      type: Date,
      default: Date.now,
    },
    jobDetails: {
      type: Map,
      of: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

/*
  jobDetails: {
    aboutJob: string,
    aboutRole: string;
    aboutCompany: string;
    requirements: string;
    jobLink: string;
    jobThumbnail: string;
  }
 */

jobSchema.plugin(mongooseAggregatePaginate);

export const Job = mongoose.model("Job", jobSchema);
