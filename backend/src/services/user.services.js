import User from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";


export const login = async (data) => {
  try {
    return await User.create(data);
 
  } catch (error) {
     throw new ApiError(400, error);
    
  }
  
};

 