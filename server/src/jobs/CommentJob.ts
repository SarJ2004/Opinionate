import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";
import { sendEMail } from "../config/mail.js";
import prisma from "../config/database.js";

export const commentQueueName = "commentQueue";
export const commentQueue = new Queue(commentQueueName, {
  connection: redisConnection,
  defaultJobOptions: { ...defaultQueueOptions, delay: 1000 },
});

//WORKER:
//takes in a name, and a callback function that will be executed when the job is processed
// The callback function receives a job object which contains the data of the job
export const commentWorker = new Worker(
  commentQueueName,
  async (job: Job) => {
    const data = await job.data;
    await prisma.opinionComment.create({
      data: {
        comment: data?.comment,
        opinion_id: Number(data?.id),
      },
    });
  },
  {
    connection: redisConnection,
  },
);
