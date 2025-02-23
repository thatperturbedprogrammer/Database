// prisma Singleton Pattern

// Why ?
// Frameworks like Next.js support hot reloading of changed files, which enables you to see changes to your application without restarting. 
// However, if the framework refreshes the module responsible for exporting PrismaClient, this can result in additional, unwanted instances of PrismaClient in a development environment.
// As a workaround, you can store PrismaClient as a global variable in development environments only, as global variables are not reloaded:
// src/lib/prisma.ts

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;


// Resources
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help
// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections
// https://www.robinwieruch.de/
