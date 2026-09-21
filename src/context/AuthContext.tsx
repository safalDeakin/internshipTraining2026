import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../authservice/users";
import AuthService from "../authservice/authservice";

//to use service make object of that class
const authService = new AuthService();
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => User;
  // logout: () => void;
  setUser: (user: User | null) => void;
};
//createContext allowed to share data with manu compo
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  //call login fun from class then store in state then return that
  const login = (email: string, password: string) => {
    const authenticatedUser = authService.login(email, password);
    setUser(authenticatedUser);
    return authenticatedUser;
  };
  //when fun then store null in state
  const logout = () => {
    authService.logout();
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, setUser }}>
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

//provider is act as bridge between service and ui
