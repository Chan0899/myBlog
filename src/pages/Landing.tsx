import { useMemo } from 'react';

interface NumberItem {
  id: number;
  value: number;
  left: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

function generateItems(count: number): NumberItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    value: (i % 10) + 1,
    left: Math.random() * 100,
    size: 14 + Math.random() * 36,
    opacity: 0.15 + Math.random() * 0.55,
    duration: 4 + Math.random() * 14,
    delay: Math.random() * 12,
  }));
}

export function Landing() {
  const items = useMemo(() => generateItems(300), []);

  return (
    <div className="
      min-h-full
      flex
      flex-col
      bg-gray-50
      dark:bg-black
      transition-colors
    ">
      {/* 上半部分：动效区 */}
      <div className="flex-1 flex items-center justify-center overflow-hidden relative">
        {/* 背景数字雨 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {items.map((item) => (
            <span
              key={item.id}
              className="number-rain"
              style={{
                left: `${item.left}%`,
                fontSize: `${item.size}px`,
                opacity: item.opacity,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`,
              }}
            >
              {item.value}
            </span>
          ))}
        </div>

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

      {/* 下半部分：黑色文字区 */}
      <div className="bg-black text-center py-12">
        <h1 className="text-3xl font-bold text-white mb-2">
          欢迎来到 MyApp
        </h1>
        <p className="text-gray-400">
          点击导航栏开始探索
        </p>
      </div>

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
          top: -5%;
          color: #fff;
          font-weight: 700;
          font-family: monospace;
          white-space: nowrap;
          user-select: none;
          animation: fall linear infinite;
          text-shadow: 0 0 6px rgba(255,255,255,0.5);
        }

        @keyframes fall {
          0%   { transform: translateY(-5vh); }
          100% { transform: translateY(105vh); }
        }
      `}</style>
    </div>
  );
}

export default Landing;
