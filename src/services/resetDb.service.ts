import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function resetDatabaseExceptProtected() {
  // Tablas a proteger
  const protectedTables = ['superusers', 'audit_log', '_prisma_migrations'];

  // Obtén todas las tablas del modelo Prisma
  const allTables = [
    'venues',
    'venue_coordinators',
    'assistant_coordinators',
    'collaborators',
    'mentors',
    'groups',
    'participants',
    'tutors',
    // Agrega más tablas según tu modelo
  ];

  for (const table of allTables) {
    if (!protectedTables.includes(table)) {
      // @ts-ignore
      await prisma[table].deleteMany({});
    }
  }
}
