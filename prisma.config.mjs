import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/helpstudent",
  },
  migrations: {
    seed: "node prisma/seed.js",
  },
});
