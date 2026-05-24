import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

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
      opacity: 0.15 + Math.random() * 0.55,
      duration,
      delay: -Math.random() * duration,
    };
  });
}

export function Landing() {
  const { theme } = useTheme();
  const items = useMemo(() => generateItems(300), []);

  return (
    <div className="
      flex-1
      flex
      flex-col
      bg-gray-50
      dark:bg-black
      transition-colors
      relative
      overflow-hidden
    ">
      {/* 背景数字雨 — 覆盖整个 Landing */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          '--rain-color': theme === 'dark' ? '#fff' : '#000',
          '--rain-glow': theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)',
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
      </div>

      {/* 上半部分：动效区 */}
      <div className="flex-[2] flex items-center justify-center relative">
        {/* 3D 正方体 */}
        <div className="cube-scene z-10">
          <div className="cube">
            <div className="cube-face cube-front" />
            <div className="cube-face cube-back" />
            <div className="cube-face cube-left" />
            <div className="cube-face cube-right" />
            <div className="cube-face cube-top" />
            <div className="cube-face cube-bottom" />
          </div>
        </div>
      </div>

      {/* 黑灰色透明文字区 */}
      <div className="bg-gray-900/50 backdrop-blur-sm text-center py-12 relative z-10">
        <h1 className="text-3xl font-bold text-white mb-2">
          欢迎来到 Chan
        </h1>
        <p className="text-gray-400">
          点击导航栏开始探索
        </p>
      </div>

      {/* 占位，将文字区推向上方 */}
      <div className="flex-[5]" />

      <style>{`
        .cube-scene {
          perspective: 1200px;
          width: 320px;
          height: 320px;
        }

        .cube {
          width: 320px;
          height: 320px;
          position: relative;
          transform-style: preserve-3d;
          animation: spin 12s linear infinite;
        }

        .cube-face {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 24px;
          border: 4px solid rgba(255,255,255,0.3);
          box-shadow: 0 0 80px rgba(128,0,255,0.3), inset 0 0 80px rgba(255,255,255,0.1);
        }

        .cube-front  { transform: translateZ(160px);  background: linear-gradient(135deg, #ff006e, #ff4da6); }
        .cube-back   { transform: rotateY(180deg) translateZ(160px); background: linear-gradient(135deg, #3a86ff, #4cc9f0); }
        .cube-left   { transform: rotateY(-90deg) translateZ(160px); background: linear-gradient(135deg, #8338ec, #b388eb); }
        .cube-right  { transform: rotateY(90deg) translateZ(160px);  background: linear-gradient(135deg, #06d6a0, #52e0b8); }
        .cube-top    { transform: rotateX(90deg) translateZ(160px);  background: linear-gradient(135deg, #fb5607, #ff9e5e); }
        .cube-bottom { transform: rotateX(-90deg) translateZ(160px); background: linear-gradient(135deg, #ffbe0b, #ffe066); }

        @keyframes spin {
          from { transform: rotateX(-20deg) rotateY(0deg); }
          to   { transform: rotateX(-20deg) rotateY(360deg); }
        }

        .number-rain {
          position: absolute;
          top: 0;
          color: var(--rain-color);
          font-size: 24px;
          font-weight: 700;
          font-family: monospace;
          white-space: nowrap;
          user-select: none;
          animation: fall linear infinite;
          text-shadow: 0 0 6px var(--rain-glow);
        }

        @keyframes fall {
          0%   { transform: translateY(0); }
          100% { transform: translateY(105vh); }
        }
      `}</style>
    </div>
  );
}

export default Landing;
