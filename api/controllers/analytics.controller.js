import { clickAnalytics } from "../models/analytics.js";
import { URL } from "../models/url.js";
import axios from 'axios';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";



const getAnalyticsByShortUrl=async(req,res)=>{
    const {shortId}=req.params;
    const shortUrl=await URL.findOne({shortId});
    if(!shortUrl) throw new ApiError(404,"URL not found");
    const analytics=await clickAnalytics.find({shortUrlId:shortUrl._id})
    const response=analytics.map((click)=>({
        ipAddress:click.ipAddress,
        country:click.location.country,
        city:click.location.city,
        device:click.userAgent.split(')')[0]+')',
        referrer:click.referrer,
        clickedAt:new Date(click.clickedAt).toLocaleString()
    }))
    return res.status(200).json(new ApiResponse(200,response,"success"));
}

export {getAnalyticsByShortUrl}