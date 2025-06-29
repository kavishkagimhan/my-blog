import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getAuthSession() {
  return await getServerSession(authOptions);
}

export function isAdmin(session) {
  return session?.user?.isAdmin === true;
}

export async function requireAdmin() {
  const session = await getAuthSession();
  
  if (!session || !isAdmin(session)) {
    throw new Error('Unauthorized: Admin access required');
  }
  
  return session;
}