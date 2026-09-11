import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../data/users";
import { useNavigate } from "react-router-dom";
//context will contain
type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};
//createContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);
//pass currently loggedinlogout fun to many compo rather than passing as props
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
//hooks
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("must use inside provider");
  }
  return context;
};
