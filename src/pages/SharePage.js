// src/SharePage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SharePage.css';

const SharePage = () => {
  const { shareId } = useParams();
  const [pin, setPin] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/share/create`, {
        shareId,
        pin
      });
      setData(response.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="share-container">
      <h2>Access Shared Info</h2>
      {!data ? (
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter 4-digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
          {error && <p className="error">{error}</p>}
        </form>
      ) : (
        <div className="shared-data">
          <h3>Shared Info:</h3>
          <ul>
            {Object.entries(data).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SharePage;
