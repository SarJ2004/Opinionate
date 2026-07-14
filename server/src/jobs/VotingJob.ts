import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";
import { sendEMail } from "../config/mail.js";
import prisma from "../config/database.js";
import { Redis } from "ioredis";

// Create a Redis client for trending calculations
const redis = new Redis(redisConnection as any);

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
    const updatedItem = await prisma.versoItem.update({
      where: {
        id: Number(data?.versoItemId),
      },
      data: {
        count: {
          increment: 1,
        },
      },
      select: {
        verso_id: true
      }
    });

    // Track vote velocity for Trending
    if (updatedItem?.verso_id) {
      const currentMinute = Math.floor(Date.now() / 60000);
      const hashKey = `trending_votes:${currentMinute}`;
      
      // Increment the vote count for this verso
      await redis.hincrby(hashKey, updatedItem.verso_id.toString(), 1);
      
      // Set TTL to 16 minutes just to be safe (we query the last 15 mins)
      await redis.expire(hashKey, 16 * 60);
    }
  },
  {
    connection: redisConnection,
  },
);
