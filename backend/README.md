# Service Pronto Backend (Retail MVP)

This is the Node.js/Express backend for the Service Pronto Retail Assist MVP.

## Getting Started

### 1. Install dependencies
```
npm install
```

### 2. Configure Environment
- Copy `.env.example` to `.env` and fill in your database connection and JWT secret.

### 3. Set up the database
- Install PostgreSQL locally or use a cloud provider.
- Update `DATABASE_URL` in `.env`.
- Run Prisma migrations (to be added).

### 4. Start the server
```
npm run dev
```

---

## Project Structure
- `src/` - source code
- `prisma/` - database schema

## Core Features
- REST API for requests, locations, zones, staff, admin
- WebSocket for real-time staff dashboard updates
- JWT authentication for staff/admin
- FCM push notification integration (stub for MVP)

---

## Next Steps
- Define Prisma schema for core models
- Implement API endpoints
- Set up WebSocket events
