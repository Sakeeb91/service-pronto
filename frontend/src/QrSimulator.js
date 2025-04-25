import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable } from './TableContext';
import axios from 'axios';

export default function QrSimulator() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setTable } = useTable();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLocations() {
      setLoading(true);
      setError("");
      try {
        // No auth required for locations list for demo
        const res = await axios.get('/api/locations');
        setLocations(res.data);
      } catch (e) {
        setError('Failed to load locations');
      }
      setLoading(false);
    }
    fetchLocations();
  }, []);

  const handleSelect = (location) => {
    setTable(location);
    navigate('/request-service');
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Simulate QR Code Scan</h2>
      <p>Select a table/location to simulate scanning its QR code:</p>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {locations.map(loc => (
            <li key={loc.id} style={{ marginBottom: 12 }}>
              <button onClick={() => handleSelect(loc)}>
                {loc.description} (Table #{loc.id})
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
