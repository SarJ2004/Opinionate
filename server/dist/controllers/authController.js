import { ZodError } from "zod";
import { formatError } from "../helper.js";
import { loginSchema, registerSchema } from "../validation/authValidation.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { renderEmailEjs } from "../helper.js";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        let user = await prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (user) {
            res.status(409).json({
                errors: { email: "User with this email already exists" },
            });
            return;
        }
        //ELSE NOW, ENCYRPT THE PASSWORD
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
        //NOW BEFORE CREATING A USER, WE HAVE TO VERIFY WHETHER THE MAIL IS CORRECT OR NOT
        const verificationToken = await bcrypt.hash(uuidv4(), salt);
        const url = `${process.env.SERVER_APP_URL}/verify-email` +
            `?email=${encodeURIComponent(payload.email)}` +
            `&token=${encodeURIComponent(verificationToken)}`;
        const emailBody = await renderEmailEjs("verify-email", {
            name: payload.name,
            verificationLink: url,
        });
        //SEND THE EMAIL TO THE USER
        await emailQueue.add(emailQueueName, {
            to: payload.email,
            subject: "Opinionate Email Verification",
            body: emailBody,
        });
        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                email_verification_token: verificationToken,
            },
        });
        res.status(200).json({
            message: "Please check your email to verify your account",
            data: { name: payload.name, email: payload.email },
        });
        return;
    }
    catch (error) {
        if (error instanceof ZodError) {
            console.log(error);
            res.status(422).json({
                message: "Validation failed",
                errors: formatError(error),
            });
            return;
        }
        res.status(500).json({
            message: "Something went wrong. Please try again later.",
            error: error,
        });
        return;
    }
};
export const loginController = async (req, res) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        let user = await prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (!user || user === null) {
            res.status(422).json({
                errors: {
                    email: "No user found with this email",
                },
            });
            return;
        }
        const compare = await bcrypt.compare(payload.password, user.password);
        if (!compare) {
            res.status(422).json({
                errors: {
                    email: "Invalid credentials",
                },
            });
            return;
        }
        //JWT PAYLOAD:
        let JWTPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
            expiresIn: "365d",
        });
        res.json({
            message: "Logged in successfully!",
            data: {
                ...JWTPayload,
                token: `Bearer ${token}`,
            },
        });
        return;
    }
    catch (error) {
        console.error(error);
        if (error instanceof ZodError) {
            console.log(error);
            res.status(422).json({
                message: "Validation failed",
                errors: formatError(error),
            });
            return;
        }
        res.status(500).json({
            message: "Something went wrong. Please try again later.",
            error: error,
        });
        return;
    }
};
export const credentialCheckController = async (req, res) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        let user = await prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (!user || user === null) {
            res.status(422).json({
                errors: {
                    email: "No user found with this email",
                },
            });
            return;
        }
        const compare = await bcrypt.compare(payload.password, user.password);
        if (!compare) {
            res.status(422).json({
                errors: {
                    email: "Invalid credentials",
                },
            });
            return;
        }
        res.json({
            message: "Logged in successfully!",
            data: {},
        });
        return;
    }
    catch (error) {
        console.log("hi");
        if (error instanceof ZodError) {
            console.log(error);
            res.status(422).json({
                message: "Validation failed",
                errors: formatError(error),
            });
            return;
        }
        res.status(500).json({
            message: "Something went wrong. Please try again later.",
            error: error,
        });
        return;
    }
};
