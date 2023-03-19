import { PrismaClient } from "@prisma/client";

/**
 * this practice is to avoid Prisma to create PrismaClient() instances since NextJS does hot reloading, means that
 * every code change it will refresh the page 
 */

const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prismadb = client

export default client;