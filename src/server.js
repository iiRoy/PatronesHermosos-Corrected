// src/server.js

const express = require('express');
const morgan = require('morgan');
const next = require('next');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const logRequestMiddleware = require('./middlewares/logRequestMiddleware');
const authRoutes = require('./routes/auth.routes');
const venueRoutes = require('./routes/venue.routes');
const participantRoutes = require('./routes/participant.routes');
const superuserRoutes = require('./routes/superuser.routes');
const collaboratorRoutes = require('./routes/collaborator.routes');

const dev = process.env.NODE_ENV !== 'production';
const appNext = next({ dev, dir: path.join(__dirname, '..') }); // Asume que src está dentro del root
const handle = appNext.getRequestHandler();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

appNext.prepare().then(() => {
    // Middlewares globales
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(logRequestMiddleware);

    // Rutas backend
    app.use('/api/auth', authRoutes);
    app.use('/api/venues', venueRoutes);
    app.use('/api/participants', participantRoutes);
    app.use('/api/superusers', superuserRoutes);
    app.use('/api/collaborators', collaboratorRoutes);

    app.get('/api', (req, res) => {
        res.send('¡API corriendo!');
    });

    app.get('/api/dashboard', async (req, res) => {
        try {
            const venues = await prisma.venues.findMany({
                include: {
                    groups: {
                        include: {
                            participants: true,
                            collaborators: true,
                        },
                    },
                },
            });

            const [instructoras, facilitadoras, staff] = await Promise.all([
                prisma.collaborators.count({ where: { role: 'Instructora' } }),
                prisma.collaborators.count({ where: { role: 'Facilitadora' } }),
                prisma.collaborators.count({ where: { role: 'Staff' } }),
            ]);

            const [colaboradores, participantes, mentoras, coordinadoras] =
                await Promise.all([
                    prisma.collaborators.count(),
                    prisma.participants.count(),
                    prisma.mentors.count(),
                    prisma.venue_coordinators.count(),
                ]);

            const sedes = venues.map((venue) => {
                let participantes = 0;
                let colaboradores = 0;

                venue.groups.forEach((group) => {
                    participantes += group.participants.length;
                    colaboradores += group.collaborators.length;
                });

                return {
                    name: venue.name,
                    participantes,
                    colaboradores,
                };
            });

            res.json({
                sedes,
                resumenColaboradoras: {
                    instructoras,
                    facilitadoras,
                    staff,
                    total: instructoras + facilitadoras + staff,
                },
                resumenEvento: {
                    participantes,
                    colaboradores,
                    mentoras,
                    coordinadoras,
                },
            });
        } catch (error) {
            console.error('❌ Error al obtener datos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    // Todas las demás rutas serán manejadas por Next.js
    app.use(async (req, res) => {
        try {
            return await handle(req, res);
        } catch (err) {
            console.error('🔥 Error al manejar la ruta en Next.js:', err);
            res.status(500).send('⚠️ Error interno al manejar la ruta.');
        }
    });

    app.listen(PORT, () => {
        console.log(`Servidor combinado corriendo en http://localhost:${PORT}`);
    });
});
