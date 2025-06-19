import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "@utils/NavigationUtils";

export const NavigationInitializer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return null;
};
