import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userId, setuserId] = useState("");

  const [userToken, setuserToken] = useState(function () {
    return localStorage.getItem("userToken");
  });

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      const { user }: { user: string } = jwtDecode(
        localStorage.getItem("userToken"),
      );
      setuserId(user);
    }
  }, [userToken]);

  return (
    <AuthContext.Provider value={{ userToken, setuserToken, userId }}>
      {children}
    </AuthContext.Provider>
  );
}
