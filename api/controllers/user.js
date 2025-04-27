import { User } from "../models/user.js";
import { v4 as uuidv4 } from "uuid";

import {ApiError} from "../utils/apiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js";
import { isValidObjectId } from "mongoose";

const generateAccessTokenAndRefreshToken=async(userId)=>{
  try{
    const user=await User.findById(userId);
    if(!user){
      throw new ApiError(404,"User not found");
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave:false});
    return {refreshToken,accessToken};
  } 
  catch(err){
      throw new ApiError(
        500,
        "Somthing went wrong while generating access and refresh token"
      )
  }
}


const handleUserSignUp=asyncHandler(async(req,res)=>{
  const {name,email,password}=req.body;
  const existedUser=await User.findOne({email});
  if(existedUser){
    throw new ApiError(409,"User with email already exists")
  }
  const createdUser=await User.create({
    name,
    email,
    password
  });
  if(!createdUser){
    throw new ApiError(500,"Error occoured while creating user");
  }
  return res.status(200)
  .json(new ApiResponse(200,{name:createdUser.name,email:createdUser.email},"success"));
})

const handleUserLogIn=asyncHandler(async(req,res)=>{
  const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      throw new ApiError(404,"User not found");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
      throw new ApiError(401,"Invalid password");
    }
    const { refreshToken, accessToken } = await generateAccessTokenAndRefreshToken(
      user._id
    );

    const loggedInUser=await User.findById(user._id).select(
      "-password -refreshToken"
    );
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };
    
    res.status(200)
    .cookie("refreshToken",refreshToken,options)
    .cookie("accessToken",accessToken,options)
    .json(
      new ApiResponse(
        200,
        {user:loggedInUser},
        "user logged in successfully"
      )

    )
  })

const getUserProfile=asyncHandler(async(req,res)=>{
    const userId=req.user;
    if(!isValidObjectId(userId)) throw new ApiError(400,"Invalid user");
    
    const user=await User.findById(userId);
    if(!user) throw new ApiError(404,"User not found");
    return res.status(200).json(new ApiResponse(200,user,"success"));
})

export { handleUserSignUp, handleUserLogIn,getUserProfile };
