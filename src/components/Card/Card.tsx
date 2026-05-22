import { ReactNode } from 'react';

interface CardProps {
  // 卡片标题
  title?: ReactNode;
  // 卡片内容
  children: ReactNode;
  // 额外的样式类
  className?: string;
}

/**
 * 卡片组件 - 演示Tailwind CSS行内样式用法
 * @example
 * <Card title="用户信息">
 *   <p>这是卡片内容</p>
 * </Card>
 */
export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`
      bg-white
      rounded-lg
      shadow-md
      overflow-hidden
      transition-shadow
      duration-300
      hover:shadow-lg
      ${className}
    `}>
      {/* 卡片头部 */}
      {title && (
        <div className="
          px-6
          py-4
          border-b
          border-gray-200
          bg-gray-50
        ">
          <h3 className="
            text-lg
            font-semibold
            text-gray-900
            m-0
          ">
            {title}
          </h3>
        </div>
      )}

      {/* 卡片内容区域 */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export default Card;
