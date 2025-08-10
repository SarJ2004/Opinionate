import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
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
