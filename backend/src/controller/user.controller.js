import User from "../model/user.model.js";
import { login } from "../services/user.services.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { loginSchema, userSchema } from "../validators/userValidators.js";

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

export const signUpController = asyncHandler(async (req, res) => {
  const { error, value } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new ApiError(400, error);
  }

  const user = await login(value);
  return res
    .status(201)
    .json(new ApiResponse(200, user, "User register Successfully"));
});

export const loginController = asyncHandler(async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const user = await User.findOne({ where: { email: value.email } });
  console.log("User is", user);

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
