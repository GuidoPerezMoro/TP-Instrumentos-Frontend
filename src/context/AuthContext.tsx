// AuthContext.tsx
import { ReactNode, createContext, useState, FC } from "react";

interface AuthContextType {
  id: number;
  username: string;
  role: string;
  isAuthenticated: boolean;
  login: (id: number, username: string, role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [id, setId] = useState(0);

  const login = (id: number, username: string, role: string) => {
    setIsAuthenticated(true);
    setId(id);
    setRole(role);
    setUsername(username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole("");
    setUsername("");
    setId(0);
    localStorage.removeItem("authInfo");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, username, id, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
