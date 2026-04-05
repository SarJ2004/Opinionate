import express, { Application, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import cors from "cors";
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";
import Routes from "./routes/index.js";
import { appLimiter } from "./config/rateLimit.js";
import fileUpload from "express-fileupload";
import { Server } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import { setupSocket } from "./socket.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Application = express();
const server: HTTPServer = createServer(app);

const PORT = process.env.PORT || 7000;

app.set("trust proxy", 1);

const allowedOrigins = (
  process.env.CORS_ORIGINS ??
  process.env.CLIENT_APP_URL ??
  ""
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    credentials: true,
  }),
);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins.length ? allowedOrigins : true,
    credentials: true,
  },
});

export { io };
setupSocket(io);
//app.use(express.static("public/")) -> serves the content of a particular folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(appLimiter);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

//ROUTES:
app.use(Routes);

app.get("/", async (req: Request, res: Response) => {
  const html = await ejs.renderFile(
    path.resolve(__dirname, "./views/emails/welcome.ejs"),
    { name: "sarge" },
  );
  // await sendEMail("fakac47066@calorpg.com", "den", html);
  //we are adding a job to the queue
  // the first parameter is the name of the queue, and the second parameter is the data that will be passed to the job
  // await emailQueue.add(emailQueueName, {
  //   to: "phoenixsarthak1@gmail.com",
  //   subject: "test",
  //   body: html,
  // });
  res.json({ msg: "Welcome to opinionate!" });
  return;
});

//QUEUE:

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
