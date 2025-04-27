import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import path, { dirname } from "path";
import QrCode from "../models/qrcode.js";
import QRCode from "qrcode";
import fs from "fs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { fileURLToPath } from "url";
import crypto from "crypto";
import { isValidObjectId } from "mongoose";
const generateQrCode = asyncHandler(async (req, res) => {
  const { longurl } = req.body;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const existingQr = await QrCode.findOne({ longUrl: longurl });
  if (existingQr) {
    return res
      .status(200)
      .json(new ApiResponse(200, existingQr, "Qr already exists"));
  }
  const hash = crypto.createHash("md5").update(longurl).digest("hex");
  const fileName = `${hash}-qr.png`;

  const filePath = path.join(__dirname, "../qrcodes", fileName);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  await QRCode.toFile(filePath, longurl, {
    type: "png",
    width: 300,
    margin: 2,
  });
  const cloudResult = await uploadOnCloudinary(filePath);
  console.log(cloudResult);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  const qrDoc = await QrCode.create({
    longUrl: longurl,
    qrCodeUrl: cloudResult.secure_url,
    createdBy: req.user._id,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, qrDoc, "QR code created and uploaded"));
});

const allUserUrl = asyncHandler(async (req, res) => {
    const userId=req.user._id;
    if(!isValidObjectId(userId)) throw new ApiError(400,"Invalid userId");
    const qrDoc=await QrCode.find({createdBy:userId});
    if(qrDoc.length==0) return res.status(200).json(new ApiResponse(200,{},"User don't generated any QR"));
    const response= qrDoc.map((qr)=>({
      longUrl:qr.longUrl,
      qrCodeUrl:qr.qrCodeUrl
    }))
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          response,
          "success"
        )
      );
});

export { generateQrCode, allUserUrl };
