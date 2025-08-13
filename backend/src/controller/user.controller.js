import User from "../model/user.model.js";
import { login } from "../services/user.services.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { loginSchema, userSchema } from "../validators/userValidators.js";

const generateAccessTokenandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateToken();
    const refreshToken = user.generateRefereshToken();

    // save the refresh token in Db and validateBeforeSave so the
    // usermodel can't reveladate again bcz every time when we call save method it's fire the mongoose model
    user.refreshToken = refreshToken;

    user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
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
  console.log("User is" , user)
   
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordValid = await  user.checkPassword(value.password);
   
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid login credentails");
   
  }

  return res.status(200).json(new ApiResponse(200, {user:"abhishek"} , "User get successffully"));
});
