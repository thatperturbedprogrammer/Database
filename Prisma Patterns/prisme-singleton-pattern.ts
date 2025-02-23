// prisma Singleton Pattern
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
// https://www.robinwieruch.de/
