import React, { useState } from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

 

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