import { Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";
import { sendEMail } from "../config/mail.js";
export const emailQueueName = "emailQueue";
export const emailQueue = new Queue(emailQueueName, {
    connection: redisConnection,
    defaultJobOptions: defaultQueueOptions,
});
//WORKER:
//takes in a name, and a callback function that will be executed when the job is processed
// The callback function receives a job object which contains the data of the job
export const emailWorker = new Worker(emailQueueName, async (job) => {
    const data = await job.data;
    await sendEMail(data.to, data.subject, data.body);
}, {
    connection: redisConnection,
});
