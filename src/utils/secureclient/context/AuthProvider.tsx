//author: Shrjja

import { useState, type ReactNode } from "react";
import AuthService from "../services/AuthService";
import type { User } from "../services/models/users";
import AuthContext from "./AuthContext";
import type { Action, Resources } from "../services/models/permission";
import type { Organization } from "../services/models/organization";

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const authService = new AuthService();

    const [user, setUser] = useState<User | undefined>(() => {
        return authService.getCurrentUser();
    });

    const [organization, setOrganization] = useState<Organization | undefined>(() => {
        return authService.getOrganizationById(user?.organizationId);
    });


    //call login fun from class then store in state then return that
    const login = (email: string, password: string) => {
        const authenticatedUser = authService.login(email, password);
        setUser(authenticatedUser);
        setOrganization(authService.getOrganizationById(authenticatedUser.organizationId))
        return authenticatedUser;
    };
    //when fun then store null in state
    const logout = () => {
        authService.logout();
        setUser(undefined);
    };

    const isAuthenticated = (): boolean => {
        if (user) {
            return authService.isAuthenticated(user)
        }
        return false;
    };

    const isAuthorized = (selectedOrgSlug: string, resource: Resources, action: Action): boolean => {
        const selectedOrg = getOrganizationFromSlug(selectedOrgSlug);
        console.log("Found Oranization Slug " + selectedOrgSlug)
        console.log(selectedOrg)
        if (selectedOrg)
            if (user) {
                console.log("User also found")
                console.log(user)
                return authService.isAuthorized(selectedOrg.id, user, resource, action)
            }
        return false;
    };

    const getOrganizationFromSlug = (organizationSlug: string | undefined): Organization | undefined => {
        return authService.getOrganizationFromSlug(organizationSlug);
    }

    return (
        <AuthContext.Provider value={{
            user, login, setUser, logout,
            organization,
            isAuthenticated,
            isAuthorized,
            getOrganizationFromSlug
        }}>
            {children}
        </AuthContext.Provider>
    );
};