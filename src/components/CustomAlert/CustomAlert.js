import React, { useEffect } from 'react';

const CustomAlert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  const alertStyles = {
    padding: '10px 15px',
    borderRadius: '4px',
    margin: '20px 0',
    textAlign: 'center',
    fontWeight: 'bold',
    color: type === 'success' ? '#155724' : '#721c24',
    backgroundColor: type === 'success' ? '#d4edda' : '#f8d7da',
    border: type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
  };

  return <div style={alertStyles}>{message}</div>;
};

export default CustomAlert;
