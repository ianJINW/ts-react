import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient({
	datasources: {
		db: { url: process.env.DATABASE_URL },
	},
  log: [
    { level: "query", emit: "event" },
    { level: "info", emit: "event" },
    { level: "warn", emit: "event" },
    { level: "error", emit: "event" },
  ],
});

// Listen for query events with proper type definitions
prisma.$on("query", (e: Prisma.QueryEvent) => {
  console.log(`Query: ${e.query}`);
  console.log(`Params: ${e.params}`);
  console.log(`Duration: ${e.duration}ms`);
});

// Log info events
prisma.$on("info", (e: any) => {
  console.log(`\n[INFO] ${new Date().toISOString()}`);
  console.log(`Message: ${e.message}`);
});

// Log warning events
prisma.$on("warn", (e: any) => {
  console.warn(`\n[WARN] ${new Date().toISOString()}`);
  console.warn(`Message: ${e.message}`);
});

// Log error events
prisma.$on("error", (e: any) => {
  console.error(`\n[ERROR] ${new Date().toISOString()}`);
  console.error(`Message: ${e.message}`);
});

export default prisma;
 
