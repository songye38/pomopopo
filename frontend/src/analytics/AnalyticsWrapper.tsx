// AnalyticsWrapper.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

export default function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);

  return <>{children}</>;
}
