import UserRole from "../model/userRole.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createUserRole = asyncHandler(async(req, res) => {
  const { type } = req.body;
  console.log("req" , req.body)
  if (!type) {
    throw new ApiError(400, "User Type is required");
  }
  const userrole = await UserRole.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(200, userrole, "user Role created successfully"));
});


export const getAllUserRole = asyncHandler(async(req, res)=>{
    const  getRole =  await UserRole.findAll()
    return res
    .status(201)
    .json(new ApiResponse(200, getRole, "Get All UserRole Successfully"));
})