// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-Y84S2CY7HK"; // 여기에 GA4 측정 ID 입력

ReactGA.initialize(GA_MEASUREMENT_ID);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
