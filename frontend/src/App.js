import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerApp from './customer/CustomerApp';
import StaffApp from './staff/StaffApp';
import AdminApp from './admin/AdminApp';
import { TableProvider } from './TableContext';

export default function App() {
  return (
    <TableProvider>
      <Routes>
        {/* Customer PWA (default route for QR codes) */}
        <Route path="/customer/*" element={<CustomerApp />} />
        {/* Staff mobile app */}
        <Route path="/staff/*" element={<StaffApp />} />
        {/* Admin dashboard */}
        <Route path="/admin/*" element={<AdminApp />} />
        {/* Default: redirect to customer PWA */}
        <Route path="*" element={<Navigate to="/customer" replace />} />
      </Routes>
    </TableProvider>
  );
}
