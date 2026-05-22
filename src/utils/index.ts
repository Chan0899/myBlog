// 通用工具函数库

/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param delay 延迟毫秒数
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * 节流函数
 * @param fn 要执行的函数
 * @param interval 间隔毫秒数
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastTime = 0;
  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      fn(...args);
      lastTime = now;
    }
  };
}

/**
 * 本地存储工具
 */
export const storage = {
  get: (key: string) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`获取本地存储失败: ${key}`, error);
      return null;
    }
  },
  set: (key: string, value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`设置本地存储失败: ${key}`, error);
    }
  },
  remove: (key: string) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`删除本地存储失败: ${key}`, error);
    }
  },
  clear: () => {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('清空本地存储失败', error);
    }
  }
};
