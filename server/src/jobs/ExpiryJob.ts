import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";
import prisma from "../config/database.js";

export const pollExpiryQueueName = "pollExpiryQueue";
export const pollExpiryQueue = new Queue(pollExpiryQueueName, {
  connection: redisConnection,
  defaultJobOptions: { ...defaultQueueOptions },
});

export const pollExpiryWorker = new Worker(
  pollExpiryQueueName,
  async (job: Job) => {
    const data = await job.data;
    if (data?.versoId) {
      await prisma.verso.update({
        where: {
          id: Number(data.versoId),
        },
        data: {
          is_locked: true,
        },
      });
      console.log(`[ExpiryJob] Verso ${data.versoId} locked successfully.`);
    }
  },
  {
    connection: redisConnection,
  }
);
