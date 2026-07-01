const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');
const bcrypt = require('bcryptjs');

try {
  process.loadEnvFile();
} catch (e) {}

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const username = 'admin';
  const rawPassword = 'admin12345';
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  // Seed the admin user if they do not exist
  const admin = await prisma.admin.upsert({
    where: { username },
    update: {},
    create: {
      username,
      password: hashedPassword,
    },
  });

  console.log(`Successfully seeded admin user: ${admin.username}`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
