import Login from "./Pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/SignUp/Signup";
import Home from "./Pages/Home/Home";
import RequireUser from "./Components/RequireUser";
import Feed from "./Components/feed/Feed";
import Profile from "./Components/profile/Profile";
import UpdateProfile from "./Components/updateProfile/UpdateProfile";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import RequireIfNoLogin from "./Components/RequireIfNoLogin";
import toast, { Toaster } from "react-hot-toast";
import { getItem, removeItem, setItem } from "./Utils/localStorageManager";
import Explore from "./Components/explore/Explore";
import SearchUser from "./Components/searchUser/SearchUser";

export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";

function App() {
    const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
    const toastData = useSelector((state) => state.appConfigReducer.toastData);

    const [darkMode, setDarkMode] = useState(getItem("darkMode") || false);
    const loadingRef = useRef(null);

    useEffect(() => {
        if (isLoading) {
            loadingRef.current?.continuousStart();
        } else {
            loadingRef.current?.complete();
        }
    }, [isLoading]);

    useEffect(() => {
        const storedDarkMode = getItem("darkMode");
        if (storedDarkMode !== null) {
            setDarkMode(storedDarkMode);
        }
    }, []);

    useEffect(() => {
        switch (toastData.type) {
            case TOAST_SUCCESS:
                toast.success(toastData.message);
                break;
            case TOAST_FAILURE:
                toast.error(toastData.message);
                break;
            default:
                break;
        }
    }, [toastData]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (darkMode) {
            removeItem("darkMode");
        } else {
            setItem("darkMode", !darkMode);
        }
    };

    return (
        <div className={darkMode ? "App dark-mode" : "App"}>
            <LoadingBar color={darkMode ? "white" : "#000"} ref={loadingRef} />
            <div>
                <Toaster />
            </div>
            <Routes>
                <Route element={<RequireUser />}>
                    <Route
                        element={
                            <Home
                                darkMode={darkMode}
                                toggleDarkMode={toggleDarkMode}
                            />
                        }
                    >
                        <Route path="/" element={<Feed />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/profile/:userId" element={<Profile />} />
                        <Route path="/search" element={<SearchUser />} />
                        <Route
                            path="/updateProfile"
                            element={<UpdateProfile />}
                        />
                    </Route>
                </Route>
                <Route element={<RequireIfNoLogin />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
