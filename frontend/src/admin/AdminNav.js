import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminNav() {
  return (
    <nav style={{ marginBottom: 24 }}>
      <Link to="/admin/stores" style={{ marginRight: 16 }}>Stores</Link>
      <Link to="/admin/zones" style={{ marginRight: 16 }}>Zones</Link>
      <Link to="/admin/locations" style={{ marginRight: 16 }}>Locations</Link>
      <Link to="/admin/staff">Staff</Link>
    </nav>
  );
}
