//PRETTY PRINTING THE ERROR
import { ZodError } from "zod";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
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
  payload: Record<string, any>
): Promise<string> => {
  const html = await ejs.renderFile(
    path.resolve(__dirname, `./views/emails/${fileName}.ejs`),
    payload
  );
  return html;
};
