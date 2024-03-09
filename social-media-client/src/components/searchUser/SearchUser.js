import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userImage from "../../assets/user.png";
import { axiosClient } from "../../Utils/axiosClient";
import { BiArrowBack } from "react-icons/bi";
import "./SearchUser.scss";

const SearchUser = ({ closeSearchBox, setOpenSearchBox, darkMode }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosClient.post("/user/searchUser", {
                searchQuery,
            });
            setSearchResults(res.result.user);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className={darkMode ? "SearchUser dark-mode" : "SearchUser"}>
            <div className="blank" onClick={closeSearchBox}></div>
            <div className="search-container">
                <div className="top">
                    <div className="back" onClick={closeSearchBox}>
                        <BiArrowBack />
                    </div>
                    <h2 className="head">Search</h2>
                </div>
                <div className="input-field">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-label="Search"
                                className="_ab6-"
                                color="#8e8e8e"
                                fill="#8e8e8e"
                                height="16"
                                role="img"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path
                                    d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                />
                                <line
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    x1="16.511"
                                    x2="22"
                                    y1="16.511"
                                    y2="22"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
                <div className="search-result">
                    {searchResults?.map((user) => (
                        <div className="user-profile" key={user._id}>
                            <div
                                className="avatar-name"
                                onClick={() => {
                                    navigate(`/profile/${user._id}`);
                                    setOpenSearchBox(false);
                                }}
                            >
                                <div className="avatar">
                                    <img
                                        src={
                                            user?.avatar?.url
                                                ? user?.avatar?.url
                                                : userImage
                                        }
                                        alt="User Avatar"
                                    />
                                </div>
                                <h3 className="name">{user?.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchUser;
