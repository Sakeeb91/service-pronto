const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const { authenticateToken } = require('../middleware/auth');

// List all staff
router.get('/', authenticateToken, async (req, res) => {
  const staff = await prisma.staff.findMany({ include: { staffZones: { include: { zone: true } }, store: true } });
  res.json(staff);
});

// Get a single staff member
router.get('/:id', authenticateToken, async (req, res) => {
  const staff = await prisma.staff.findUnique({ where: { id: parseInt(req.params.id) }, include: { staffZones: { include: { zone: true } }, store: true } });
  if (!staff) return res.status(404).json({ error: 'Staff not found' });
  res.json(staff);
});

// Create a new staff member
router.post('/', authenticateToken, async (req, res) => {
  const { name, email, password, storeId, zoneIds, isAdmin } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const staff = await prisma.staff.create({
    data: {
      name,
      email,
      password: hashedPassword,
      storeId,
      isAdmin: !!isAdmin,
      staffZones: {
        create: zoneIds.map(zoneId => ({ zoneId }))
      }
    },
    include: { staffZones: true }
  });
  res.status(201).json(staff);
});

// Update a staff member
router.put('/:id', authenticateToken, async (req, res) => {
  const { name, email, password, zoneIds, isAdmin } = req.body;
  try {
    const updateData = { name, email, isAdmin };
    if (password) updateData.password = await bcrypt.hash(password, 10);
    // Remove existing zone assignments and add new ones
    await prisma.staffZone.deleteMany({ where: { staffId: parseInt(req.params.id) } });
    const staff = await prisma.staff.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...updateData,
        staffZones: {
          create: zoneIds.map(zoneId => ({ zoneId }))
        }
      },
      include: { staffZones: true }
    });
    res.json(staff);
  } catch (e) {
    res.status(404).json({ error: 'Staff not found' });
  }
});

// Delete a staff member
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.staff.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).end();
  } catch (e) {
    res.status(404).json({ error: 'Staff not found' });
  }
});

module.exports = router;
