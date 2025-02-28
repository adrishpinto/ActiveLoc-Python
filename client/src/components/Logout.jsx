import React, { useState } from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, {
        withCredentials: true 
      });
      
      setMessage(response.data.message);
      localStorage.removeItem('userData');
      
      // You might want to redirect the user or update app state
      // Example: history.push('/login') or dispatch(logoutAction())
    } catch (err) {
      setError(err.response?.data?.error || 'Logout failed');
    }
  };

  return (
    <div className="logout-container">
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      
      <button 
        onClick={handleLogout}
        className="logout-button"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;