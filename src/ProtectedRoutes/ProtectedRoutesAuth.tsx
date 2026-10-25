import { Navigate } from "react-router-dom";

export default function ProtectedRoutesAuth({ children }) {
  if (localStorage.getItem("userToken")) return <Navigate to={"/"} />;
  else return <> {children}</>;
}
