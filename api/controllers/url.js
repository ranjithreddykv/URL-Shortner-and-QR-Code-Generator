import { nanoid } from "nanoid";
import { URL } from "../models/url.js";
import { clickAnalytics } from "../models/analytics.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js"
import axios from "axios";
const handlegenerateNewShortURL=asyncHandler(async(req,res)=>{
  const userId=req.user._id;
  const {longUrl, customCode, expiresIn}=req.body;
  if(!longUrl) throw new ApiError(400,"long url requried");
  const shortId=customCode||nanoid(6);
  const isAlreadyExist = await URL.findOne({shortId:shortId});
  if(isAlreadyExist){
    return res.status(400).json(400,shortId,"Is already exist in taken to another long url")
  }
  const expiresAt=expiresIn? new Date(Date.now()+expiresIn*24*60*60*1000):null;
  const newUrl = await URL.create({
    shortId,
    redirectURL:longUrl,
    expiresAt,
    createdBy:userId
  });
  const shortUrl=`http://${req.get('host')}/url/${shortId}`
  return res.status(200).json(new ApiResponse(200,shortUrl,"Short url generated"));
})

async function handleRedirectToWebsite(req, res) {
  try {
    const { shortId } = req.params;

    const shortUrl = await URL.findOne({ shortId });
    if (!shortUrl) return res.status(404).send("Short URL not found");

    

    let location = { country: "India", city: "Bangalore" };
    // try {
    //   const response = await axios.get(`http://ip-api.com/json/${req.ip}`);
    //   const { country, city } = response.data;
    //   location = { country, city };
    // } catch (err) {
    //   console.error("Location fetch failed:", err.message);
    // }

    try {
      await clickAnalytics.create({
        shortUrlId: shortUrl._id,
        ipAddress: req.ip,
        location,
        userAgent: req.headers["user-agent"],
        referrer: req.get("Referrer") || "Direct",
      });
      console.log("Analytics saved!");
    } catch (err) {
      console.error("Error saving analytics:", err.message);
    }

    shortUrl.visitHistory.push({ timestamp: Date.now() });
    await shortUrl.save();

   
    return res.redirect(shortUrl.redirectURL);
  } catch (error) {
    console.error("handleRedirectToWebsite error:", error.message);
    res.status(500).send("Internal Server Error");
  }
}

const getAllUrls = asyncHandler(async (req, res) => {
  const urls = await URL.find({ createdBy: req.user._id });
  console.log("controller :", urls);
  if (urls.length === 0) throw new ApiError(404, "Urls not found");
  const response = urls.map((url) => ({
    shortId: url.shortId,
    redirectURL: url.redirectURL,
    clicks: url.visitHistory.length,
    shortUrl: `${req.protocol}://${req.get("host")}/url/${url.shortId}`,
  }));
  return res.status(200).json(new ApiResponse(200, response, "success"));
});

async function handleNumberOfVisites(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  console.log(result);

  return res.json({
    numOfvisits: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

export {
  handlegenerateNewShortURL,
  handleRedirectToWebsite,
  handleNumberOfVisites,
  getAllUrls
};
