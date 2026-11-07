import { Navigate } from "react-router-dom";
import { useAuth } from "../useAuth";

const RootRedirect = () => {
    const { user, organization } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!organization) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Navigate to={`/${organization.slug}`} replace />;
};

export default RootRedirect
