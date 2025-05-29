import { useEffect, useState } from 'react';

export function useIsResizing(debounceDelay = 300) {
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleResize = () => {
      setIsResizing(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsResizing(false);
      }, debounceDelay);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [debounceDelay]);

  return isResizing;
}
