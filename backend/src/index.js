require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Auth route
app.use('/api/auth', require('./routes/auth'));
// Store routes
app.use('/api/stores', require('./routes/store'));
// Zone routes
app.use('/api/zones', require('./routes/zone'));
// Location routes
app.use('/api/locations', require('./routes/location'));
// Staff routes
app.use('/api/staff', require('./routes/staff'));
// Request routes
app.use('/api/requests', require('./routes/request'));

// Socket.io setup (for staff dashboard)
io.on('connection', (socket) => {
  console.log('Staff dashboard connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Staff dashboard disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
  console.log(`Service Pronto backend running on port ${PORT}`);
});
