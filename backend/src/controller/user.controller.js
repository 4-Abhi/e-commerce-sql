import { Op } from "sequelize";
import User from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { loginSchema, userSchema } from "../validators/userValidators.js";
import { uploadCloud } from "../utils/cloudinary.js";

const generateAccessTokenandRefreshToken = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // save the refresh token in Db and validateBeforeSave so the
    // usermodel can't reveladate again bcz every time when we call save method it's fire the mongoose model
    user.refreshToken = refreshToken;
    await user.save({ validate: false });
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.log("Error is", error);
    throw new ApiError(500, "Something went wrong to generateAccessToken");
  }
};

// Register
export const registerController = asyncHandler(async (req, res) => {
  const { error, value } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    throw new ApiError(400, error);
  }

  const isUserExists = await User.findOne({
    where: {
      [Op.or]: [{ username: value.username }, { email: value.email }],
    },
  });

  if (isUserExists) {
    throw new ApiError(409, "User already exit");
  }
  const avatarFilePath = req.files?.avatar?.[0].path;
  const avatar = avatarFilePath ? await uploadCloud(avatarFilePath) : "";

  const user = await User.create({
    username: value.username,
    email: value.email,
    password: value.password,
    fullName: value.fullName,
    avatar: avatar.url || "",
    roleId: value.roleId,
  });
  return res
    .status(201)
    .json(new ApiResponse(200, user, "User register Successfully"));
});

// Login Controller

export const loginController = asyncHandler(async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const user = await User.findOne({ where: { email: value.email } });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordValid = await user.checkPassword(value.password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid login credentails");
  }
  const { accessToken, refreshToken } =
    await generateAccessTokenandRefreshToken(user.id);

  const loggedInUser = await User.findOne({
    where: { id: user.id },
    attributes: { exclude: ["password", "refreshToken"] },
  });
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          user: loggedInUser,
          refreshToken,
        },
        "User Loged in Successfull."
      )
    );
});
