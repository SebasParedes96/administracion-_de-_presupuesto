import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";

function PublicRoutes () {
const {isAuthenticated} = useAuthContext()

if (isAuthenticated) {
    return <Navigate to={'/private'} />;
}

return (
    <div>
        <Outlet />
    </div>
)

}

export default PublicRoutes