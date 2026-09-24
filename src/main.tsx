import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./auth/AuthContext.tsx";
import { OrganizationProvider } from "./context/OrganizationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <OrganizationProvider>
        {" "}
        <App />
      </OrganizationProvider>
    </AuthProvider>
  </StrictMode>,
);
// in securecell app should include
//authentication verify
//access management
//token
