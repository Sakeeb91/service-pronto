const express = require('express');
const router = express.Router();
const { PrismaClient, RequestStatus } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticateToken } = require('../middleware/auth');

// List all requests (optionally filter by status, zone, store)
router.get('/', authenticateToken, async (req, res) => {
  const { status, zoneId, storeId } = req.query;
  const where = {};
  if (status) where.status = status;
  if (zoneId) where.location = { zoneId: parseInt(zoneId) };
  if (storeId) where.location = { storeId: parseInt(storeId) };
  const requests = await prisma.request.findMany({
    where,
    include: { location: { include: { store: true, zone: true } }, staff: true }
  });
  res.json(requests);
});

// Get a single request
router.get('/:id', authenticateToken, async (req, res) => {
  const request = await prisma.request.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { location: { include: { store: true, zone: true } }, staff: true }
  });
  if (!request) return res.status(404).json({ error: 'Request not found' });
  res.json(request);
});

// Create a new request (customer action)
// This endpoint is intentionally public (no authentication required)
router.post('/', async (req, res) => {
  console.log('POST /api/requests body:', req.body);
  const { locationId, deviceId } = req.body;

  // Validate locationId exists
  const location = await prisma.location.findUnique({ where: { id: locationId } });
  if (!location) {
    return res.status(400).json({ error: `Location with id ${locationId} does not exist.` });
  }

  try {
    const request = await prisma.request.create({
      data: {
        locationId,
        deviceId,
        status: RequestStatus.PENDING
      },
      include: { location: true }
    });
    // TODO: emit socket.io event for staff dashboard
    res.status(201).json(request);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Acknowledge a request (staff action)
router.post('/:id/acknowledge', authenticateToken, async (req, res) => {
  const { staffId } = req.body;
  try {
    const request = await prisma.request.update({
      where: { id: parseInt(req.params.id) },
      data: {
        status: RequestStatus.ACKNOWLEDGED,
        acknowledgedAt: new Date(),
        staffId
      }
    });
    // TODO: emit socket.io event for staff dashboard
    res.json(request);
  } catch (e) {
    res.status(404).json({ error: 'Request not found' });
  }
});

// Resolve a request (staff action)
router.post('/:id/resolve', authenticateToken, async (req, res) => {
  try {
    const request = await prisma.request.update({
      where: { id: parseInt(req.params.id) },
      data: {
        status: RequestStatus.RESOLVED,
        resolvedAt: new Date()
      }
    });
    // TODO: emit socket.io event for staff dashboard
    res.json(request);
  } catch (e) {
    res.status(404).json({ error: 'Request not found' });
  }
});

// Cancel a request (customer or admin action)
router.post('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const request = await prisma.request.update({
      where: { id: parseInt(req.params.id) },
      data: {
        status: RequestStatus.CANCELLED
      }
    });
    // TODO: emit socket.io event for staff dashboard
    res.json(request);
  } catch (e) {
    res.status(404).json({ error: 'Request not found' });
  }
});

module.exports = router;
