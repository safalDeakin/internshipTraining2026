import { BrowserRouter, Routes, Route } from "react-router-dom";
import SecureCellRoute from "./security/SecureCellRoute";
import type { ReactNode } from "react";
import Login from "../../component/Login";
import Unauthorized from "../../component/Unauthorized";

interface SecureConfig {
  authServerUrl: string;
  clientId: string;
  pubKey: string;
}
interface SecureAppClientProps {
  children?: ReactNode;
  config?: SecureConfig;
}
//should not create application route here only accept props from parent
const SecureAppClient = ({ children, config }: SecureAppClientProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<SecureCellRoute showNavbar />}>{children}</Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SecureAppClient;
