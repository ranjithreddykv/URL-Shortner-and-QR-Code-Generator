import express from "express";
import { getUserProfile,handleUserSignUp, handleUserLogIn } from "../controllers/user.js";
import { verifyJWT } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", handleUserSignUp);
router.post("/login", handleUserLogIn);
router.route("/profile").get(verifyJWT, getUserProfile);
export { router };
