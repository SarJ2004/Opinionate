import { Router } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/database.js";
const router = Router();
router.get("/verify-email", async (req, res) => {
    const email = req.query.email;
    const token = req.query.token;
    if (email && token) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            const isValid = await bcrypt.compare(token, user.email_verification_token);
            if (isValid) {
                //Redirect to front page
                await prisma.user.update({
                    where: {
                        email: email,
                    },
                    data: {
                        email_verification_token: null, // Clear the token after verification
                        email_verified_at: new Date().toISOString(),
                    },
                });
                res.redirect(`${process.env.CLIENT_APP_URL}/login`);
                return;
            }
        }
        res.redirect("/verify-error");
        return;
    }
    res.redirect("/verify-error");
    return;
});
router.get("/verify-error", (req, res) => {
    return res.render("auth/verify-error");
});
export default router;
