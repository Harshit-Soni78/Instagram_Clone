import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getItem, KEY_ACCESS_TOKEN } from "../Utils/localStorageManager";

function RequireIfNoLogin() {
    const user = getItem(KEY_ACCESS_TOKEN);
    return user ? <Navigate to="/" /> : <Outlet />;
}

export default RequireIfNoLogin;
