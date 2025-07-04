import { useEffect, useState } from 'react';

export default function BmcPopup() {
  const [visible, setVisible] = useState(false);
  const [raised, setRaised] = useState(0);

  const goal = 100;
  const progress = Math.min((raised / goal) * 100, 100);

  useEffect(() => {
    fetch(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSXAMSBaMtS5jhtmJ6vb6aCn5trlL6Lw9OT7QEkZQ1gi-EZ7UQb5kkLXeHor5LtsbYG7oOQW3vA1cas/pub?gid=0&single=true&output=csv'
    )
      .then((res) => res.text())
      .then((csv) => {
        const lines = csv.trim().split('\n');
        const headers = lines[0].split(',');
        const amountIndex = headers.findIndex(
          (h) => h.toLowerCase() === 'amount'
        );

        if (amountIndex === -1) {
          console.error('Amount column not found in CSV:', headers);
          return;
        }

        const rows = lines.slice(1);
        const total = rows.reduce((sum, line) => {
          const cols = line.split(',');
          const amount = parseFloat(cols[amountIndex]);
          return !isNaN(amount) ? sum + amount : sum;
        }, 0);

        setRaised(total);
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
    <>
      <style>{`
        @keyframes fadeInPopup {
          from {
            transform: translate(-50%, -50%) scale(0.98);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes pulseBmc {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 0 0px rgba(255, 221, 0, 0));
          }
          50% {
            transform: scale(1.06);
            filter: drop-shadow(0 0 12px rgba(255, 221, 0, 0.9));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 0px rgba(255, 221, 0, 0));
          }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          padding: '1.25rem 1.5rem',
          backgroundColor: 'rgba(31, 31, 31, 0.92)',
          color: 'white',
          borderRadius: '0.75rem',
          textAlign: 'center',
          maxWidth: '320px',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          WebkitMaskImage:
            'radial-gradient(circle at center, rgba(0,0,0,1) 95%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          animation: 'fadeInPopup 0.6s ease-out forwards',
          opacity: 0,
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
          ${raised.toFixed(2)} raised of ${goal} annual goal
        </p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://www.buymeacoffee.com/qtcbt"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block' }}
          >
            <img
              src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=qtcbt&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff"
              alt="Buy Me a Coffee"
              style={{
                height: '44px',
                maxWidth: '100%',
                animation: 'pulseBmc 4s ease-in-out infinite',
              }}
            />
          </a>
        </div>
      </div>
    </>
  );
}
