// src/server.js

const express = require('express');
const morgan = require('morgan');
const app = express();

// Middlewares globales
const logRequestMiddleware = require('./middlewares/logRequestMiddleware');

// Rutas
const authRoutes = require('./routes/auth.routes');
const venueRoutes = require('./routes/venue.routes');
const participantRoutes = require('./routes/participant.routes');

app.use(express.json());
app.use(morgan('dev'));
app.use(logRequestMiddleware); // Aplica el log para todas las peticiones

// Prefijos de ruta
app.use('/api/auth', authRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/participants', participantRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('¡Servidor corriendo con middlewares y validaciones!');
});

// Manejo de errores no definidos
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
