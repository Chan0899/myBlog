import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // 按钮类型：primary(主要)、secondary(次要)、danger(危险)
  variant?: 'primary' | 'secondary' | 'danger';
  // 按钮尺寸：small(小)、default(默认)、large(大)
  size?: 'small' | 'default' | 'large';
  // 是否禁用
  disabled?: boolean;
}

/**
 * 通用按钮组件 - 演示CSS Modules样式隔离
 * @example
 * <Button variant="primary" size="large">提交</Button>
 */
export function Button({
  variant = 'primary',
  size = 'default',
  disabled = false,
  children,
  className,
  ...props
}: ButtonProps) {
  // 组合样式类名
  const classNames = [
    styles.button,
    styles[variant],
    size !== 'default' && styles[size],
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
