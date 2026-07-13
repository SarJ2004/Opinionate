import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";
import { sendEMail } from "../config/mail.js";
import prisma from "../config/database.js";

export const votingQueueName = "votingQueue";
export const votingQueue = new Queue(votingQueueName, {
  connection: redisConnection,
  defaultJobOptions: { ...defaultQueueOptions, delay: 500 },
});

//WORKER:
//takes in a name, and a callback function that will be executed when the job is processed
// The callback function receives a job object which contains the data of the job
export const votingWorker = new Worker(
  votingQueueName,
  async (job: Job) => {
    const data = await job.data;
    await prisma.versoItem.update({
      where: {
        id: Number(data?.versoItemId),
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });
  },
  {
    connection: redisConnection,
  },
);
