import { Request, Response } from "express";
import { ZodError } from "zod";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { checkHourDiff, formatError, renderEmailEjs } from "../helper.js";
import {
  forgetPasswordSchema,
  resetPasswordSchema,
} from "../validation/passwordValidation.js";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";

export const forgetPassController = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = forgetPasswordSchema.parse(body);
    //check if the email exists in db
    let user = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!user || user === null) {
      res.status(422).json({
        message: "Invalid data",
        errors: {
          email: "No user found with this email",
        },
      });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const token = await bcrypt.hash(uuidv4(), salt);
    await prisma.user.update({
      where: {
        email: payload.email,
      },
      data: {
        password_reset_token: token,
        token_send_at: new Date().toISOString(),
      },
    });

    const url = `${process.env.CLIENT_APP_URL}/reset-password?email=${payload.email}&token=${encodeURIComponent(token)}`;
    //it will redirect to /reset-password page...with email and token as query params
    const html = await renderEmailEjs("forget-password", { resetLink: url });
    await emailQueue.add(emailQueueName, {
      to: payload.email,
      subject: "Password Reset Request",
      body: html,
    });
    res.status(200).json({
      message: "Password reset link has been sent to your email",
    });
    return;
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422).json({
        message: "Validation failed",
        errors: formatError(error),
      });
      return;
    }
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
    return;
  }
};

export const resetPassController = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = resetPasswordSchema.parse(body);
    let user = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!user || user === null) {
      res.status(422).json({
        message: "Invalid data",
        errors: {
          email:
            "Link is invalid, please recheck if you have used the correct link",
        },
      });
      return;
    }

    if (user.password_reset_token !== payload.token) {
      res.status(422).json({
        message: "Invalid data",
        errors: {
          email:
            "Link is invalid, please recheck if you have used the correct link",
        },
      });
      return;
    }

    const hoursDiff = checkHourDiff(user.token_send_at!);
    if (hoursDiff > 2) {
      //remove the expired token
      await prisma.user.update({
        where: {
          email: payload.email,
        },
        data: {
          password_reset_token: null,
          token_send_at: null,
        },
      });
      res.status(422).json({
        message: "Link expired",
        errors: {
          email:
            "The password reset link has expired. Please request a new one.",
        },
      });
      return;
    }
    //update the new password
    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(payload.password, salt);
    await prisma.user.update({
      where: { email: payload.email },
      data: {
        password: newPass,
        password_reset_token: null,
        token_send_at: null,
      },
    });
    res.status(200).json({
      message: "Password has been reset successfully",
    });
    return;
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422).json({
        message: "Validation failed",
        errors: formatError(error),
      });
      return;
    }
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
    return;
  }
};
