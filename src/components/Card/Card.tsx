import { ReactNode } from 'react';

interface CardProps {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`
      bg-white
      dark:bg-ink-800
      rounded-lg
      shadow-md
      dark:shadow-ink-800/50
      overflow-hidden
      transition-shadow
      duration-300
      hover:shadow-lg
      transition-colors
      ${className}
    `}>
      {title && (
        <div className="
          px-6
          py-4
          border-b
          border-gray-200
          dark:border-ink-600
          bg-gray-50
          dark:bg-ink-700
        ">
          <h3 className="
            text-lg
            font-semibold
            text-gray-900
            dark:text-ink-50
            m-0
          ">
            {title}
          </h3>
        </div>
      )}

      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export default Card;
