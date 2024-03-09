import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dummyImg from "../../assets/user.png";
import { RxCross2 } from "react-icons/rx";
import "./FollowerBox.scss";

function FollowerBox({ darkMode, closeFollowers, setOpenFollowers }) {
    const navigate = useNavigate();
    const userProfile = useSelector((state) => state.postReducer.userProfile);

    return (
        <div className={darkMode ? "FollowerBox dark-mode" : "FollowerBox"}>
            <div className="blank" onClick={closeFollowers}></div>
            <div className="follower-container">
                <div className="close-icon" onClick={closeFollowers}>
                    <RxCross2 />
                </div>
                <div className="top">Followers</div>
                <div className="followers-list">
                    {userProfile?.followers?.map((follower) => (
                        <div
                            className="follower"
                            onClick={() => {
                                navigate(`/profile/${follower?._id}`);
                                setOpenFollowers(false);
                            }}
                        >
                            <div className="avatar">
                                <img
                                    src={
                                        follower?.avatar?.url
                                            ? follower?.avatar?.url
                                            : dummyImg
                                    }
                                    alt="user avatar"
                                />
                            </div>
                            <div className="follower-name">
                                {follower?.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FollowerBox;
