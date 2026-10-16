import { useEffect } from "react";
import { useLocation } from "react-router"; // O 'react-router-dom' dependiendo de tu versión

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}