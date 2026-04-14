import React, { useEffect } from 'react';
import './Toast.css';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icon = { success: '✅', error: '❌', info: 'ℹ️' }[type] ?? '✅';

  return (
    <div className={`toast toast--${type}`} role="status" aria-live="polite" aria-atomic="true">
      <span className="toast__icon" aria-hidden="true">{icon}</span>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={onClose} aria-label="Dismiss notification">×</button>
    </div>
  );
}
