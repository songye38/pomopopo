// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import ReactGA from 'react-ga4';
import AnalyticsWrapper from './analytics/AnalyticsWrapper.tsx';


// 배포 환경에서만 GA 초기화
if (import.meta.env.VITE_ENV === 'production') {
  ReactGA.initialize(import.meta.env.VITE_GA_ID);
}

// 루트 렌더링
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AnalyticsWrapper>
        <App />
      </AnalyticsWrapper>
    </BrowserRouter>
  </StrictMode>,
);
