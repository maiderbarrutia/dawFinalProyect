import { useEffect, useState } from 'react';

const useHeaderHeight = () => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.querySelector('#main-header') as HTMLElement;
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight);
      }
    };

    updateHeaderHeight();

    window.addEventListener('resize', updateHeaderHeight);

    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return headerHeight;
};

export default useHeaderHeight;
