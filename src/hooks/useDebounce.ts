import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 如果 value 在 delay 時間內改變，就會清除前一個 timer，重新計時
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}