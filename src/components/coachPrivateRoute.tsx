import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

interface CoachPrivateRouteProps {
  children: ReactNode; // Define the type for children as ReactNode
}

const CoachPrivateRoute: React.FC<CoachPrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const coach = useSelector((state: RootState) => state.coach);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      if (!coach.firstName) {
        navigate("/");
      }
    }
  }, [navigate]);

  return <div>{children}</div>;
};

export default CoachPrivateRoute;
