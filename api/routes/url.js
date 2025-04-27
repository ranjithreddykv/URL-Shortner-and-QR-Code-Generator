import express from "express";
import {
  handlegenerateNewShortURL,
  handleRedirectToWebsite,
  handleNumberOfVisites,
  getAllUrls,
} from "../controllers/url.js";
const router = express.Router();
import { URL } from "../models/url.js";
import { verifyJWT } from "../middleware/auth.js";
router.post("/",verifyJWT ,handlegenerateNewShortURL);
router.get("/all",verifyJWT,getAllUrls)
router.get("/:shortId", handleRedirectToWebsite);

router.get("/analytics/:shortId", handleNumberOfVisites);
export { router };
