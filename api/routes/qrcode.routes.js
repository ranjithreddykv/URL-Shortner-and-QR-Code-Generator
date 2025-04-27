import express from 'express';
import {
  generateQrCode,
  allUserUrl,
} from "../controllers/qrcode.controller.js";
import { verifyJWT } from "../middleware/auth.js";
const router=express.Router();

router.post('/gen',verifyJWT,generateQrCode);
router.get('/all',verifyJWT,allUserUrl)


export  {router};
