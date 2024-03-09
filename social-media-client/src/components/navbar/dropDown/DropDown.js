import React from "react";
import {
    KEY_ACCESS_TOKEN,
    removeItem,
} from "../../../Utils/localStorageManager";
import { axiosClient } from "../../../Utils/axiosClient";
import { useNavigate } from "react-router-dom";
import "./DropDown.scss";

function DropDown({ toggleDarkMode, darkMode, dropDownClose }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axiosClient.post("/auth/logout");
            removeItem(KEY_ACCESS_TOKEN);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={darkMode ? "Dropdown dark-mode" : "Dropdown"}>
            <div className="blank" onClick={dropDownClose}></div>
            <ul className="dropdown-list">
                <li onClick={() => navigate("/updateProfile")}>
                    Settings
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Settings"
                        className="_ab6-"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            fill="none"
                            r="8.635"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        />
                        <path
                            d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                            fill="none"
                            stroke="currentColor"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        />
                    </svg>
                </li>
                <li onClick={toggleDarkMode}>
                    Switch appearance
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Theme icon"
                        className="_ab6-"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 16 16"
                        width="24"
                    >
                        <path
                            d="M8.05 16C3.61 16 0 12.39 0 7.95 0 3.99 2.83.65 6.72 0c.49-.03.87.22.99.6.11.38-.05.78-.41 1-1.7.93-2.75 2.69-2.75 4.61 0 2.89 2.35 5.25 5.25 5.25a5.25 5.25 0 0 0 4.61-2.74c.19-.37.61-.54 1.01-.4.42.14.66.56.58 1.01A8.044 8.044 0 0 1 8.05 16zM5.8 1.32c-2.78.93-4.73 3.56-4.73 6.63 0 3.85 3.13 6.99 6.99 6.99 3.04 0 5.66-1.93 6.61-4.72a6.301 6.301 0 0 1-4.87 2.31c-3.48 0-6.31-2.83-6.31-6.31-.01-1.93.86-3.71 2.31-4.9zm9.54 7.89s0 .01 0 0c0 .01 0 0 0 0z"
                            fill="currentColor"
                        />
                    </svg>
                </li>
                <li onClick={handleLogout}>Log out</li>
            </ul>
        </div>
    );
}

export default DropDown;
