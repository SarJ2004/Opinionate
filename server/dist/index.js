import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";
import Routes from "./routes/index.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
//ROUTES:
app.use(Routes);
app.get("/", async (req, res) => {
    const html = await ejs.renderFile(path.resolve(__dirname, "./views/emails/welcome.ejs"), { name: "sarge" });
    // await sendEMail("fakac47066@calorpg.com", "den", html);
    //we are adding a job to the queue
    // the first parameter is the name of the queue, and the second parameter is the data that will be passed to the job
    await emailQueue.add(emailQueueName, {
        to: "phoenixsarthak1@gmail.com",
        subject: "test",
        body: html,
    });
    res.json({ msg: "Welcome to opinionate!" });
    return;
});
//QUEUE:
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
