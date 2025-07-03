import { useEffect, useState } from 'react';

export default function BmcPopup() {
  const [visible, setVisible] = useState(false);

  // Customize these values
  const goal = 100;      // your funding goal (e.g. $100)
const [raised, setRaised] = useState(0);

useEffect(() => {
  fetch('/donations.json')
    .then(res => res.json())
    .then(data => {
      if (typeof data.total === 'number') {
        setRaised(data.total);
      }
    })
    .catch(err => {
      console.error('Failed to load donation data:', err);
    });
}, []);

  const progress = Math.min((raised / goal) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 15000); // 1 seconds

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
      padding: '1.25rem 1.5rem',
      background: '#1f1f1f',
      color: 'white',
      borderRadius: '0.75rem',
      textAlign: 'center',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
      maxWidth: '320px'
    }}>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close"
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.75rem',
          background: 'none',
          border: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          color: '#ccc'
        }}
      >
        &times;
      </button>

      <p style={{ marginBottom: '0.75rem', fontWeight: 500 }}>
        Help keep the site up — even $1 helps.
      </p>

      <div style={{
        background: '#1a1a1a',
        borderRadius: '0.375rem',
        overflow: 'hidden',
        height: '10px',
        marginBottom: '0.5rem'
      }}>
        <div style={{
          width: `${progress}%`,
          backgroundColor: '#FFDD00',
          height: '100%'
        }} />
      </div>

      <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
        ${raised} raised of ${goal} annual goal
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
        ☕ Buy Me A Coffee
      </a>
    </div>
  );
}
