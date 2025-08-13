export const asyncHandler = (requestHandler) => {
 return (req, res, next) => {
    Promise.resolve(requestHandler(req , res , next)).catch(next);
  };
};

// export const asyncHandler2 = (fn)=>async (req, res,next)=>{
//   try {
//     await fn(req, res , next)

//   } catch (error) {

//   }
// }
