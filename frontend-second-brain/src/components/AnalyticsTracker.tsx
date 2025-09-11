// ------------using gpt----
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    plausible?: (...args: any[]) => void;
  }
}

export const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    window.plausible && window.plausible("pageview");
  }, [location]);

  return null;
};
