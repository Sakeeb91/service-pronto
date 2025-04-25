const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Staff/Admin login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const staff = await prisma.staff.findUnique({ where: { email } });
  if (!staff) return res.status(401).json({ error: 'Invalid email or password' });
  const valid = await bcrypt.compare(password, staff.password);
  if (!valid) return res.status(401).json({ error: 'Invalid email or password' });
  const token = jwt.sign(
    { id: staff.id, email: staff.email, isAdmin: staff.isAdmin, storeId: staff.storeId },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  );
  res.json({ token, staff: { id: staff.id, name: staff.name, email: staff.email, isAdmin: staff.isAdmin, storeId: staff.storeId } });
});

module.exports = router;
