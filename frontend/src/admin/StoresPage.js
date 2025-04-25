import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StoresPage() {
  const [stores, setStores] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get token from localStorage or prompt user to add your preferred token logic
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStores();
    // eslint-disable-next-line
  }, []);

  const fetchStores = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get('/api/stores', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStores(res.data);
    } catch (e) {
      setError('Failed to load stores');
    }
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post('/api/stores', { name, address }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setName("");
      setAddress("");
      fetchStores();
    } catch (e) {
      setError('Failed to add store');
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await axios.delete(`/api/stores/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchStores();
    } catch (e) {
      setError('Failed to delete store');
    }
  };

  return (
    <div>
      <h3>Stores</h3>
      <form onSubmit={handleAdd} style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Store Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ marginRight: 8 }}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button type="submit">Add Store</button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(store => (
              <tr key={store.id}>
                <td>{store.id}</td>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>
                  <button onClick={() => handleDelete(store.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
