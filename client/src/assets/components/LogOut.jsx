import React from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../context/authContext";

function Logout() {
    const { logout } = useAuthContext();

    useEffect(() => {
        logout();
    })
}

export default Logout
