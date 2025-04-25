import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNav from './AdminNav';
import StoresPage from './StoresPage';
import ZonesPage from './ZonesPage';
import LocationsPage from './LocationsPage';
import StaffPage from './StaffPage';

function AdminDashboard() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <p>Manage stores, zones, locations, and staff.</p>
    </div>
  );
}

export default function AdminApp() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Panel</h1>
      <AdminNav />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/zones" element={<ZonesPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/staff" element={<StaffPage />} />
      </Routes>
    </div>
  );
}
