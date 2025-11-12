import { Router } from "express";
import { registerController, loginController, credentialCheckController, } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();
//REGISTER
router.post("/register", registerController);
//LOGIN
router.post("/login", loginController);
//LOGIN CHECK ROUTE
router.post("/check/credentials", credentialCheckController);
//GET USER
router.get("/user", authMiddleware, async (req, res) => {
    const user = req.user; //extracting the user after it has been verified by the auth middleware
    res.json({ data: user });
    return;
});
export default router;
