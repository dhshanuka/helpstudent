'use server';

import prisma from '@/lib/db';
import { setAdminSession, clearAdminSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function submitIssueAction(prevState, formData) {
  const registrationNumberStr = formData.get('registrationNumber');
  const idNumber = formData.get('idNumber')?.toString().trim();
  const fullName = formData.get('fullName')?.toString().trim();
  const issueDescription = formData.get('issueDescription')?.toString().trim();

  // 1. Basic validation
  if (!registrationNumberStr || !idNumber || !fullName || !issueDescription) {
    return { error: 'All fields are required.' };
  }

  const regNum = Number(registrationNumberStr);
  if (isNaN(regNum) || !Number.isInteger(regNum)) {
    return { error: 'Registration Number must be a valid integer.' };
  }

  // 2. Registration Number range check (600000 - 900000)
  if (regNum < 600000 || regNum > 900000) {
    return { error: 'Registration Number must be between 600000 and 900000 (inclusive).' };
  }

  // 3. Even number check (regNum % 2 === 0)
  if (regNum % 2 !== 0) {
    return { error: 'Registration Number must be an even number.' };
  }

  // 4. Strict Single-Submission Policy
  try {
    const existingSubmission = await prisma.studentSubmission.findFirst({
      where: {
        OR: [
          { registrationNumber: regNum },
          { idNumber: idNumber }
        ]
      }
    });

    if (existingSubmission) {
      return { error: 'You have already submitted a form.' };
    }

    // Save submission
    await prisma.studentSubmission.create({
      data: {
        registrationNumber: regNum,
        idNumber,
        fullName,
        issueDescription,
      }
    });

    return { success: true, message: 'Your issue has been submitted successfully!' };

  } catch (error) {
    console.error('Error submitting form:', error);
    return { error: 'An unexpected database error occurred. Please try again.' };
  }
}

export async function loginAdminAction(prevState, formData) {
  const username = formData.get('username')?.toString().trim();
  const password = formData.get('password')?.toString();

  if (!username || !password) {
    return { error: 'Username and password are required.' };
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      return { error: 'Invalid username or password.' };
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return { error: 'Invalid username or password.' };
    }

    await setAdminSession(admin);
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }

  redirect('/admin/dashboard');
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect('/admin/login');
}
