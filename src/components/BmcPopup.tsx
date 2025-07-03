import { useEffect, useState } from 'react';

export default function BmcPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 15000); // 15 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999,
      padding: '1rem 1.5rem',
      background: 'white',
      border: '2px solid #FFD700',
      borderRadius: '0.75rem',
      textAlign: 'center',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
      maxWidth: '300px'
    }}>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close"
        style={{
          position: 'absolute',
          top: '0.3rem',
          right: '0.6rem',
          background: 'none',
          border: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          color: '#555'
        }}
      >
        &times;
      </button>
      <p style={{ marginBottom: '0.75rem', fontWeight: 500 }}>
        Support this CBT project 👇
      </p>
      <a
        href="https://coff.ee/qtcbt"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          backgroundColor: '#FFDD00',
          color: '#000',
          fontWeight: 'bold',
          borderRadius: '0.375rem',
          textDecoration: 'none'
        }}
      >
        💰 Buy Me a Coffee 💰
      </a>
    </div>
  );
}
