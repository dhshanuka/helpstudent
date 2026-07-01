import { defineConfig, env } from "prisma/config";

try {
  process.loadEnvFile();
} catch (e) {
  // Fallback if loadEnvFile is not supported or .env is not present
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
  migrations: {
    seed: "node prisma/seed.js",
  },
});
