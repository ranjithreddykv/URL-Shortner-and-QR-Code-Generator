import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT=asyncHandler(async(req,_,next)=>{
  const token = req.cookies?.accessToken||req?.header("Authorization")?.replace("Bearer ","");
  
  if(!token){
    throw new ApiError(401,"Unauthorization");
  }
  try{
    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const user=await User.findById(decodedToken?._id)
    .select("-password -refreshToken");
    if(!user){
      throw new ApiError(401,"Unauthorization");
    }
    req.user=user;
    
    next();
  }
  catch(err){
    throw new ApiError(401,err?.message||"Invalid access Token"); 
  }

})