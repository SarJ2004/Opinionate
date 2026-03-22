import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import moment from "moment";
import { supportedMimes } from "./config/filesystem.js";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "./config/cloudinary.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const formatError = (error) => {
    const formatted = {};
    error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
            formatted[field] = issue.message;
        }
    });
    return formatted;
};
// HELPER TO DYNAMICALLY CREATE AN HTML:
export const renderEmailEjs = async (fileName, payload) => {
    const html = await ejs.renderFile(path.resolve(__dirname, `./views/emails/${fileName}.ejs`), payload);
    return html;
};
export const checkHourDiff = (date) => {
    const now = moment();
    const tokenSendAt = moment(date);
    const difference = moment.duration(now.diff(tokenSendAt));
    return difference.asHours();
};
export const imageValidator = (size, mime) => {
    if (bytesToMB(size) > 2) {
        return "Image size should be less than 2 MB";
    }
    else if (!supportedMimes.includes(mime)) {
        return "Image must be of type PNG, JPG, JPEG, GIF or WEBP";
    }
    return null; //no error
};
export const bytesToMB = (bytes) => {
    return bytes / (1024 * 1024);
};
export const uploadFile = async (image) => {
    try {
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: "opinions",
            public_id: uuidv4(),
        });
        return result.public_id;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};
export const deleteFile = async (public_id) => {
    try {
        // const public_id = path.split("/")[1];
        const result = await cloudinary.uploader.destroy(public_id);
        return result.result;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};
