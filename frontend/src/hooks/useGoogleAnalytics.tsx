import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const useGoogleAnalytics = (trackingId: string) => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', trackingId, {
        page_path: location.pathname,
      });
    }
  }, [location, trackingId]);
};

export default useGoogleAnalytics;
