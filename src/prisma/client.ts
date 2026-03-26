import { PrismaClient } from '../../generated/prisma/index.js';
// import config from '../../prisma.config.js';
// import { PrismaClient } from "@prisma/client/extension";
// import { PrismaClient } from "./path/to/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });
// const prisma  = new PrismaClient();


export default prisma;

