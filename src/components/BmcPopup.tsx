import { useEffect, useState } from 'react';

export default function BmcPopup() {
  const [visible, setVisible] = useState(false);
  const [raised, setRaised] = useState(0);

  const goal = 100;
  const progress = Math.min((raised / goal) * 100, 100);

  useEffect(() => {
    // Fetch donation total from public Google Sheets CSV
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSXAMSBaMtS5jhtmJ6vb6aCn5trlL6Lw9OT7QEkZQ1gi-EZ7UQb5kkLXeHor5LtsbYG7oOQW3vA1cas/pub?gid=0&single=true&output=csv')
      .then((res) => res.text())
      .then((csv) => {
        const lines = csv.trim().split('\n');
        const headers = lines[0].split(',');
        const firstRow = lines[1]?.split(',');

        const totalIndex = headers.findIndex(h => h.toLowerCase().includes('total'));

        if (totalIndex !== -1 && firstRow && !isNaN(Number(firstRow[totalIndex]))) {
          setRaised(Number(firstRow[totalIndex]));
        } else {
          console.error('Could not parse total from CSV:', { headers, firstRow });
        }
      })
      .catch((err) => {
        console.error('Failed to fetch donation CSV:', err);
      });
  }, []);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('bmc-popup-shown');
    if (alreadyShown === 'true') return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem('bmc-popup-shown', 'true');
    }, 25000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
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
        maxWidth: '320px',
      }}
    >
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
          color: '#ccc',
        }}
      >
        &times;
      </button>

      <p style={{ marginBottom: '0.75rem', fontWeight: 500 }}>
        Help keep the site up — even $1 helps.
      </p>

      <div
        style={{
          background: '#1a1a1a',
          borderRadius: '0.375rem',
          overflow: 'hidden',
          height: '10px',
          marginBottom: '0.5rem',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: '#FFDD00',
            height: '100%',
          }}
        />
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
          textDecoration: 'none',
        }}
      >
        ☕ Buy Me A Coffee
      </a>
    </div>
  );
}
