import React, { useEffect } from "react";
import Navbar from "../../Components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../../redux/slices/appConfigSlice";
import "./Home.scss";

function Home({ darkMode, toggleDarkMode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyInfo());
    }, [dispatch]);

    return (
        <div className="Home">
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <div className="outlet" style={{ width: "100%" }}>
                <Outlet />
            </div>
        </div>
    );
}

export default Home;
