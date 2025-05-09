const request = require('supertest');
const app = require('../app'); // Your Express app
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('POST /api/venues', () => {
  beforeEach(async () => {
    // Clean up database before each test
    await prisma.venues.deleteMany();
    await prisma.venue_coordinators.deleteMany();
    await prisma.assistant_coordinators.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a venue successfully', async () => {
    const response = await request(app)
      .post('/api/venues')
      .set('Authorization', 'Bearer your_admin_token') // Replace with a valid admin token
      .send({
        name: 'Instituto Oriente',
        location: 'Puebla',
        address: '123 Main St',
        logo: null,
        participation_file: 'JVBERi0xLjQK...', // Base64 string of a small PDF
        generalCoordinator: {
          name: 'Edna',
          lastNameP: 'Moda',
          lastNameM: 'Smith',
          email: 'edna@example.com',
          phone: '+52 222 123 4567',
          gender: 'Mujer',
          username: 'edna_moda',
          password: 'Password123!',
          profileImage: null,
        },
        associatedCoordinator: {
          name: 'Juana',
          lastNameP: 'De Arco',
          lastNameM: 'Ramirez',
          email: 'juana@example.com',
          phone: '+52 222 123 4568',
        },
        staffCoordinator: {
          name: 'Maria',
          lastNameP: 'Lopez',
          lastNameM: 'Gomez',
          email: 'maria@example.com',
          phone: '+52 222 123 4569',
        },
        participantsCoordinator: {
          name: 'Sofia',
          lastNameP: 'Hernandez',
          lastNameM: 'Cruz',
          email: 'sofia@example.com',
          phone: '+52 222 123 4570',
        },
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Venue creado exitosamente' });

    const venue = await prisma.venues.findFirst({ where: { name: 'Instituto Oriente' } });
    expect(venue).not.toBeNull();
    expect(venue.status).toBe('Pendiente');
  });

  it('should return 422 for validation errors', async () => {
    const response = await request(app)
      .post('/api/venues')
      .set('Authorization', 'Bearer your_admin_token')
      .send({
        location: 'Puebla',
        address: '123 Main St',
        participation_file: 'JVBERi0xLjQK...',
        generalCoordinator: {
          name: 'Edna',
          lastNameP: 'Moda',
          lastNameM: 'Smith',
          email: 'invalid-email',
          phone: '+52 222 123 4567',
          gender: 'Mujer',
          username: 'edna_moda',
          password: 'Password123!',
          profileImage: null,
        },
      });

    expect(response.status).toBe(422);
    expect(response.body.message).toBe('Error de validación');
    expect(response.body.errors).toContainEqual(
      expect.objectContaining({ msg: 'El nombre del venue es obligatorio' })
    );
  });

  it('should return 401 for unauthenticated requests', async () => {
    const response = await request(app)
      .post('/api/venues')
      .send({
        name: 'Instituto Oriente',
        location: 'Puebla',
        address: '123 Main St',
        participation_file: 'JVBERi0xLjQK...',
        generalCoordinator: {
          name: 'Edna',
          lastNameP: 'Moda',
          lastNameM: 'Smith',
          email: 'edna@example.com',
          phone: '+52 222 123 4567',
          gender: 'Mujer',
          username: 'edna_moda',
          password: 'Password123!',
          profileImage: null,
        },
      });

    expect(response.status).toBe(401);
  });
});