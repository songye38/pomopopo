


import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

export default function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useLayoutEffect(() => {
    // GA 초기화가 안 된 경우 방지
    if (!import.meta.env.VITE_GA_ID) return;

    // 페이지뷰 전송
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);

  return <>{children}</>;
}
