import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";


function PrivateRoutes () {
    const {isAuthenticated} = useAuthContext()

    if (!isAuthenticated) {
        return <Navigate to={'/'} />;
    }
    
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default PrivateRoutes