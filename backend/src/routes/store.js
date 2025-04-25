const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticateToken } = require('../middleware/auth');

// List all stores
router.get('/', authenticateToken, async (req, res) => {
  const stores = await prisma.store.findMany();
  res.json(stores);
});

// Get a single store
router.get('/:id', authenticateToken, async (req, res) => {
  const store = await prisma.store.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!store) return res.status(404).json({ error: 'Store not found' });
  res.json(store);
});

// Create a new store
router.post('/', authenticateToken, async (req, res) => {
  const { name, address } = req.body;
  const store = await prisma.store.create({ data: { name, address } });
  res.status(201).json(store);
});

// Update a store
router.put('/:id', authenticateToken, async (req, res) => {
  const { name, address } = req.body;
  try {
    const store = await prisma.store.update({ where: { id: parseInt(req.params.id) }, data: { name, address } });
    res.json(store);
  } catch (e) {
    res.status(404).json({ error: 'Store not found' });
  }
});

// Delete a store
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.store.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).end();
  } catch (e) {
    res.status(404).json({ error: 'Store not found' });
  }
});

module.exports = router;
