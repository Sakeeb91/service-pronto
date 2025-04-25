import React from 'react';
import { Routes, Route } from 'react-router-dom';

function StaffLogin() {
  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <h2>Staff Login</h2>
      {/* Login form will go here */}
      <input placeholder="Email" style={{ margin: 8, padding: 8 }} />
      <input placeholder="Password" type="password" style={{ margin: 8, padding: 8 }} />
      <button style={{ fontSize: 18, padding: '10px 32px', marginTop: 16 }}>Login</button>
    </div>
  );
}

function StaffDashboard() {
  return (
    <div style={{ padding: 24 }}>
      <h2>My Zone Requests</h2>
      {/* Request list will go here */}
      <p>No requests yet.</p>
    </div>
  );
}

export default function StaffApp() {
  return (
    <Routes>
      <Route path="/" element={<StaffLogin />} />
      <Route path="/dashboard" element={<StaffDashboard />} />
    </Routes>
  );
}
