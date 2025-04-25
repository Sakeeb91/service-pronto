const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticateToken } = require('../middleware/auth');

// List all locations (public, no authentication required)
router.get('/', async (req, res) => {
  const locations = await prisma.location.findMany({ include: { store: true, zone: true } });
  res.json(locations);
});

// Get a single location
router.get('/:id', authenticateToken, async (req, res) => {
  const location = await prisma.location.findUnique({ where: { id: parseInt(req.params.id) }, include: { store: true, zone: true } });
  if (!location) return res.status(404).json({ error: 'Location not found' });
  res.json(location);
});

// Create a new location
router.post('/', authenticateToken, async (req, res) => {
  const { description, storeId, zoneId, qrCode } = req.body;
  const location = await prisma.location.create({ data: { description, storeId, zoneId, qrCode } });
  res.status(201).json(location);
});

// Update a location
router.put('/:id', authenticateToken, async (req, res) => {
  const { description, zoneId, qrCode } = req.body;
  try {
    const location = await prisma.location.update({ where: { id: parseInt(req.params.id) }, data: { description, zoneId, qrCode } });
    res.json(location);
  } catch (e) {
    res.status(404).json({ error: 'Location not found' });
  }
});

// Delete a location
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.location.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).end();
  } catch (e) {
    res.status(404).json({ error: 'Location not found' });
  }
});

module.exports = router;
