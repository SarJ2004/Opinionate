import { Request, Response } from "express";
import { Redis } from "ioredis";
import { redisConnection } from "../config/queue.js";
import prisma from "../config/database.js";

const redis = new Redis(redisConnection as any);

export const getTrendingVersos = async (req: Request, res: Response) => {
  try {
    const currentMinute = Math.floor(Date.now() / 60000);
    const trendingScores: Record<string, number> = {};

    // Aggregate votes from the last 15 minutes
    for (let i = 0; i < 15; i++) {
      const hashKey = `trending_votes:${currentMinute - i}`;
      const minuteVotes = await redis.hgetall(hashKey);
      
      for (const [versoId, count] of Object.entries(minuteVotes)) {
        trendingScores[versoId] = (trendingScores[versoId] || 0) + parseInt(count, 10);
      }
    }

    // Sort by highest velocity
    const sortedVersoIds = Object.keys(trendingScores)
      .sort((a, b) => trendingScores[b] - trendingScores[a])
      .slice(0, 10); // Top 10 trending

    if (sortedVersoIds.length === 0) {
      res.status(200).json({ message: "No trending versos right now", data: [] });
      return;
    }

    // Fetch the actual Verso records
    const versos = await prisma.verso.findMany({
      where: {
        id: { in: sortedVersoIds.map(Number) },
        is_locked: false // Don't show locked ones in trending
      },
      include: {
        versoItems: {
          select: { image: true, count: true }
        }
      }
    });

    // Re-sort the database results to match the trending order
    const sortedVersos = sortedVersoIds
      .map(id => versos.find(v => v.id === Number(id)))
      .filter(Boolean);

    res.status(200).json({ message: "Trending versos fetched successfully", data: sortedVersos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong fetching trending versos." });
  }
};
