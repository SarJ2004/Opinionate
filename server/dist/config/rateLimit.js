import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import Redis from "ioredis";
//There will be 2 types of limits...one for general apis, and one for auth routes.
const redisClient = process.env.REDIS_HOST
    ? new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        username: "default",
        password: process.env.REDIS_PASSWORD,
        tls: {},
    })
    : null;
const makeStore = (prefix) => {
    if (!redisClient)
        return undefined;
    // express-rate-limit requires a unique Store instance per limiter.
    return new RedisStore({
        prefix,
        // rate-limit-redis expects a node-redis-like sendCommand; ioredis supports call().
        sendCommand: (...args) => {
            const [command, ...rest] = args;
            return redisClient.call(command, ...rest);
        },
    });
};
export const appLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    limit: 10000, // Limit each IP to 10k requests to avoid local dev blocks
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    store: makeStore("rl:app:"),
});
export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    limit: 30, // Limit each IP to 30 requests per `window` (here, per 60 minutes).
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    store: makeStore("rl:auth:"),
});
