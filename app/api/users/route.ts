import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Named export for the GET method
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
  }
}
