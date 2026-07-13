//PRETTY PRINTING THE ERROR
import { ZodError } from "zod";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import moment from "moment";
import { supportedMimes } from "./config/filesystem.js";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "./config/cloudinary.js";
import { file } from "zod/v4";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const formatError = (error: ZodError): Record<string, string> => {
  const formatted: Record<string, string> = {};

  error.issues.forEach((issue) => {
    const field = issue.path[0];
    if (typeof field === "string") {
      formatted[field] = issue.message;
    }
  });

  return formatted;
};

// HELPER TO DYNAMICALLY CREATE AN HTML:

export const renderEmailEjs = async (
  fileName: string,
  payload: Record<string, any>,
): Promise<string> => {
  const html = await ejs.renderFile(
    path.resolve(__dirname, `./views/emails/${fileName}.ejs`),
    payload,
  );
  return html;
};

export const checkHourDiff = (date: Date | string): number => {
  const now = moment();
  const tokenSendAt = moment(date);
  const difference = moment.duration(now.diff(tokenSendAt));
  return difference.asHours();
};

export const imageValidator = (size: number, mime: string): string | null => {
  if (bytesToMB(size) > 2) {
    return "Image size should be less than 2 MB";
  } else if (!supportedMimes.includes(mime)) {
    return "Image must be of type PNG, JPG, JPEG, GIF or WEBP";
  }
  return null; //no error
};

export const bytesToMB = (bytes: number): number => {
  return bytes / (1024 * 1024);
};

export const uploadFile = async (image: UploadedFile): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "versos",
      public_id: uuidv4(),
    });

    return result.public_id;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteFile = async (public_id: string): Promise<string> => {
  try {
    // const public_id = path.split("/")[1];
    const result = await cloudinary.uploader.destroy(public_id);

    return result.result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
