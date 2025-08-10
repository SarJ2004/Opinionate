import { PrismaClient } from "@prisma/client";
//creating an instance of PrismaClient with logging enabled
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
  errorFormat: "pretty",
});

export default prisma;
