import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useTable } from '../TableContext';
import QrSimulator from '../QrSimulator';
import axios from 'axios';

function RequestService() {
  const { table } = useTable();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If no table selected, redirect to QR sim
  React.useEffect(() => {
    if (!table) navigate('/customer/qr-sim');
    // eslint-disable-next-line
  }, [table]);

  if (!table) return null; // Prevent flicker

  const deviceId = 'dev-' + Math.random().toString(36).substring(2, 10);

  const handleRequest = async () => {
    setLoading(true);
    setStatus(null);
    try {
      await axios.post('/api/requests', { locationId: table.id, deviceId });
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <h2>How can we help you?</h2>
      <p>Request service with just one tap.</p>
      <div style={{ margin: '24px 0', fontWeight: 'bold' }}>Table #{table.id} — {table.description}</div>
      <button
        style={{ fontSize: 18, padding: '12px 32px', marginBottom: 16, width: 240 }}
        onClick={handleRequest}
        disabled={loading}
      >
        {loading ? 'Requesting...' : 'Call Waiter'}
      </button>
      {status === 'success' && (
        <div style={{ color: 'green', marginTop: 20 }}>
          Help is on the way! A staff member has been notified.
        </div>
      )}
      {status === 'error' && (
        <div style={{ color: 'red', marginTop: 20 }}>
          Something went wrong. Please try again.
        </div>
      )}
      <div style={{ marginTop: 32 }}>
        <button onClick={() => navigate('/customer/qr-sim')}>Show QR Codes</button>
      </div>
    </div>
  );
}

export default function CustomerApp() {
  return (
    <Routes>
      <Route path="/qr-sim" element={<QrSimulator />} />
      <Route path="/request-service" element={<RequestService />} />
      {/* Default: go to QR simulator */}
      <Route path="*" element={<QrSimulator />} />
    </Routes>
  );
}
