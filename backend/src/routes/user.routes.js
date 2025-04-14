import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changeUserPassword,
  updateAccountDetails,
  updateUserProfileImage,
  listUsers,
  getUserById,
  deleteUserById,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/").post(
  verifyJWT,
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/changePassword").put(verifyJWT, changeUserPassword);

router.route("/changeImage").put(verifyJWT, updateUserProfileImage);

router.route("/").get(verifyJWT, listUsers);
router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/:userId").get(verifyJWT, getUserById);

router.route("/").put(verifyJWT, updateAccountDetails);

router.route("/:userId").delete(verifyJWT, deleteUserById);

// router.route("/refresh-token").post(refreshAccessToken)

// router.route("/register").get(showUser)

export default router;
