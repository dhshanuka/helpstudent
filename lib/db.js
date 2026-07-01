import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const prismaClientSingleton = () => {
  let url = process.env.DATABASE_URL;
  if (!url) {
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
    url = `file:${dbPath}`;
  }
  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
