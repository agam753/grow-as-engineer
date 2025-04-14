import { Router } from "express";
import {
  createJob,
  updateJobDetails,
  listJobs,
  getJobById,
  deleteJobById,
} from "../controllers/job.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

// protected routes
router.route("/").post(
  verifyJWT,
  // upload.fields([
  //   {
  //     name: "thumbnail",
  //     maxCount: 1,
  //   },
  // ]),
  createJob
);
router.route("/:jobId").put(
  verifyJWT,
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  updateJobDetails
);
router.route("/:jobId").delete(verifyJWT, deleteJobById);

// un-protected routes
router.route("/").get(listJobs);
router.route("/:jobId").get(getJobById);

export default router;
