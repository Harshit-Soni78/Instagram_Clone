import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dummyImg from "../../assets/user.png";
import { RxCross2 } from "react-icons/rx";
import "./FollowingBox.scss";

function FollowingBox({ darkMode, closeFollowing, setOpenFollowing }) {
    const navigate = useNavigate();
    const userProfile = useSelector((state) => state.postReducer.userProfile);

    return (
        <div className={darkMode ? "FollowingBox dark-mode" : "FollowingBox"}>
            <div className="blank" onClick={closeFollowing}></div>
            <div className="following-container">
                <div className="close-icon" onClick={closeFollowing}>
                    <RxCross2 />
                </div>
                <div className="top">Following</div>
                <div className="following-list">
                    {userProfile?.followings?.map((following) => (
                        <div
                            className="following"
                            onClick={() => {
                                navigate(`/profile/${following?._id}`);
                                setOpenFollowing(false);
                            }}
                        >
                            <div className="avatar">
                                <img
                                    src={
                                        following?.avatar?.url
                                            ? following?.avatar?.url
                                            : dummyImg
                                    }
                                    alt="user avatar"
                                />
                            </div>
                            <div className="following-name">
                                {following?.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FollowingBox;
