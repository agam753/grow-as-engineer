import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError, ApiErrorResponse } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAcessToken();

    await user.save({ validateBeforeSave: false });

    return { accessToken };
  } catch (error) {
    throw new ApiError(
      (500, "Somewthing went wrong while generating tokens!!")
    );
  }
};

const createUser = async (userAttrs) => {
  console.log("Creating the user with attributes", userAttrs);
  return await User.create(userAttrs);
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation -- not empty
  // check if user already exists : username, email
  // check for image
  // create user object - create entry in db.
  // remove password and refresh token field from response
  // check for user creation
  // return response...

  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some(
      (field) => field?.trim() === "" || field === undefined
    )
  ) {
    throw new ApiError(400, "All field are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with username or email exist");
  }

  let profileImagePath;

  if (
    req.files &&
    typeof req.files == "object" &&
    req.files.profileImage &&
    req.files.profileImage.length > 0
  ) {
    profileImagePath = req.files.profileImage[0].path;
  }

  const profileImage = await uploadOnCloudinary(profileImagePath);

  const user = await createUser({
    fullName,
    profileImage: profileImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully!!"));
});

const getCurrentUser = asyncHandler((req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current User fetched successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  // find the user
  // password check
  // access and refresh token
  // send  cookie

  const { email, username, password } = req.body;

  console.log(username, password);
  if (!username && !email) {
    return res
      .status(400)
      .json(new ApiErrorResponse(400, "username or email is required"));
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw res.status(404).json(new ApiErrorResponse(404, "User doesn't exist"));
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw res
      .status(401)
      .json(new ApiErrorResponse(401, "Invalid user credentials."));
  }

  // cookie should expire first
  const options = {
    httpOnly: true,
    secure: true,
    expiresIn: new Date(Date.now() + process.env.ACCESS_TOKEN_EXPIRY),
  };
  const { accessToken } = await generateAccessAndRefreshTokens(user._id);
  const loggedInUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  /* NOT USING REFRESH TOKEN ANYMORE */
  // await User.findByIdAndUpdate(
  //   req.user._id,
  //   {
  //     $unset: {
  //       refreshToken: 1, // this removes the field from document
  //     },
  //   },
  //   {
  //     new: true,
  //   }
  // );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

// const refreshAccessToken = asyncHandler(async (req, res) => {
//   const incomingRefreshToken = ref.cookie.refreshToken || req.body.refreshToken

//   if (!incomingRefreshToken) {
//     throw new ApiError(401, "Unauthorized Request")
//   }

//   try {
//     const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

//     const user = await User.findById(decodedToken?._id)
//     if (!user) {
//       throw new ApiError(401, "Invalid Request Token")
//     }

//     if (incomingRefreshToken != user?.refreshToken) {
//       throw new ApiError(401, "Refresh token is expired or used.")
//     }

//     const options = {
//       httpOnly: true,
//       secure: true
//     }
//     const { accessToken } = await generateAccessAndRefreshTokens(user._id)

//     return res.status(200)
//       .cookie("accessToken", accessToken, options)
//       .cookie("refreshToken", refreshToken, options)
//       .json(new ApiResponse(200,
//         {
//           accessToken, refreshToken
//         }
//         , "Access Token is refreshed."))

//   } catch (error) {
//     throw new ApiError(401, error?.message || "Invalid refresh token")
//   }
// })

const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  if (await user.isPasswordCorrect(oldPassword)) {
    user.password = newPassword;
    await user.save({
      validateBeforeSave: false,
    });

    return res
      .status(200)
      .json(200, new ApiResponse(200, {}, "Password changed successfully!"));
  } else {
    throw new ApiError(400, "Invalid old password");
  }
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName && !email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully!"));
});

const updateUserProfileImage = asyncHandler(async (req, res) => {
  const profileImageLocalPath = req.file?.path;

  if (!profileImageLocalPath) {
    throw new ApiError(400, "Cover Image file is missing");
  }

  const profileImage = await uploadOnCloudinary(profileImageLocalPath);

  if (!profileImage.url) {
    throw new ApiError(400, "Error while uploading on cover image");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        profileImage: profileImage.url,
      },
    },
    { new: true }
  ).select("-password");

  return res.status(200).json(200, user, "Profile image is updated");
});

const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, users, "All Users informations", users.length));
});

const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User doesn't exist");
  }
  return res.status(200).json(new ApiResponse(200, user, "User informations"));
});

const deleteUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User doesn't exist");
  }
  User.deleteOne(user);
  return res.status(200).json(new ApiResponse(200, user, "User Deleted"));
});

export {
  registerUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  // refreshAccessToken,
  changeUserPassword,
  updateAccountDetails,
  updateUserProfileImage,
  createUser,
  listUsers,
  getUserById,
  deleteUserById,
};
