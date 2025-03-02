import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

interface ClientPrivateRouteProps {
  children: ReactNode; // Define the type for children as ReactNode
}

const ClientPrivateRoute: React.FC<ClientPrivateRouteProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const client = useSelector((state: RootState) => state.client);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      if (!client?.firstName) {
        navigate("/");
      }
    }
  }, [navigate]);

  return <div>{children}</div>;
};

export default ClientPrivateRoute;
