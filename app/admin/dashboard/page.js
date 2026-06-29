import { getAdminSession } from '@/lib/auth';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

// Ensure the page is dynamic and doesn't get statically built
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  
  if (!session) {
    redirect('/admin/login');
  }

  // Fetch all student submissions, latest first
  const submissions = await prisma.studentSubmission.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Serialize Date objects to ISO strings for the Client Component
  const serializedSubmissions = submissions.map((sub) => ({
    ...sub,
    createdAt: sub.createdAt.toISOString(),
  }));

  return <DashboardClient submissions={serializedSubmissions} session={session} />;
}
