import express from 'express';
import {getAnalyticsByShortUrl} from "../controllers/analytics.controller.js"
import { verifyJWT } from '../middleware/auth.js';
const router=express.Router();

router.get('/:shortId',verifyJWT,getAnalyticsByShortUrl)

export {router};