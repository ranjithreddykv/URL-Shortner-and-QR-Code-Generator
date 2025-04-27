import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const uploadOnCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath) return null;
        const response=await cloudinary.uploader.upload(
            localFilePath,{
                resource_type:"auto"
            }
        )
        console.log("File uploaded successfully,File src:"+response.url);
        //after uploading to cloudinary delete from local storage
        fs.unlinkSync(localFilePath);
        return response;
    }
    catch(err){
        console.log("Error in cloudinary",err);
        fs.unlinkSync(localFilePath);
        return null;
    }
}

const deleteFromCloudinary=async(publicId)=>{
    try{
        const result=await cloudinary.uploader.destroy(publicId);
        console.log("Deleted from cloudinary",publicId);
    }
    catch(err){
        console.log("Error occoured while deleting from cloudinary",err);
    }
}

export {uploadOnCloudinary,deleteFromCloudinary};