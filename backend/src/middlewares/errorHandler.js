import { ApiError } from "../utils/apiError.js";


export const errorHandler = (err, req, res, next) => {
    // If error is not ApiError, convert it
    if (!(err instanceof ApiError)) {
        err = new ApiError(
            err.statusCode || 500,
            err.message || "Internal Server Error",
            err.errors || []
        );
    }
     
console.log("Error Handler IS" , err)
  return res.status(err.statusCode).json({
     statusCode: err.statusCode,
        success: err.success,
        message: err.message,
        errors: err.errors,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};
