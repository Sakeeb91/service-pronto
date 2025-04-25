const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticateToken } = require('../middleware/auth');

// List all zones
router.get('/', authenticateToken, async (req, res) => {
  const zones = await prisma.zone.findMany({ include: { store: true } });
  res.json(zones);
});

// Get a single zone
router.get('/:id', authenticateToken, async (req, res) => {
  const zone = await prisma.zone.findUnique({ where: { id: parseInt(req.params.id) }, include: { store: true } });
  if (!zone) return res.status(404).json({ error: 'Zone not found' });
  res.json(zone);
});

// Create a new zone
router.post('/', authenticateToken, async (req, res) => {
  const { name, storeId } = req.body;
  const zone = await prisma.zone.create({ data: { name, storeId } });
  res.status(201).json(zone);
});

// Update a zone
router.put('/:id', authenticateToken, async (req, res) => {
  const { name } = req.body;
  try {
    const zone = await prisma.zone.update({ where: { id: parseInt(req.params.id) }, data: { name } });
    res.json(zone);
  } catch (e) {
    res.status(404).json({ error: 'Zone not found' });
  }
});

// Delete a zone
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.zone.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).end();
  } catch (e) {
    res.status(404).json({ error: 'Zone not found' });
  }
});

module.exports = router;
