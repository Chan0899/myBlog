import { useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface NumberItem {
  id: number;
  value: number;
  left: number;
  opacity: number;
  duration: number;
  delay: number;
}

function generateItems(count: number): NumberItem[] {
  return Array.from({ length: count }, (_, i) => {
    const duration = 4 + Math.random() * 14;
    return {
      id: i,
      value: Math.random() > 0.5 ? 1 : 0,
      left: Math.random() * 100,
      opacity: 0.08 + Math.random() * 0.18,
      duration,
      delay: -Math.random() * duration,
    };
  });
}

export function RainBackground() {
  const { theme } = useTheme();
  const items = useMemo(() => generateItems(200), []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        filter: 'blur(2px)',
        '--rain-color': theme === 'dark' ? '#fff' : '#000',
        '--rain-glow': theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)',
      } as React.CSSProperties}
    >
      {items.map((item) => (
        <span
          key={item.id}
          className="number-rain"
          style={{
            left: `${item.left}%`,
            opacity: item.opacity,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.value}
        </span>
      ))}
      <style>{`
        .number-rain {
          position: absolute;
          top: 0;
          color: var(--rain-color);
          font-size: 22px;
          font-weight: 700;
          font-family: monospace;
          white-space: nowrap;
          user-select: none;
          animation: rain-fall linear infinite;
          text-shadow: 0 0 4px var(--rain-glow);
        }
        @keyframes rain-fall {
          0%   { transform: translateY(0); }
          100% { transform: translateY(105vh); }
        }
      `}</style>
    </div>
  );
}

export default RainBackground;
