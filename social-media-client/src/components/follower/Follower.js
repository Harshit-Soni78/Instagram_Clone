import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import "./Follower.scss";
import { useSelector, useDispatch } from "react-redux";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router-dom";

function Follower({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const feedData = useSelector((state) => state.feedDataReducer.feedData);
    const [isFollowing, setIsFollowing] = useState();

    useEffect(() => {
        setIsFollowing(
            feedData.followings.find((item) => item._id === user._id)
        );
    }, [feedData, user._id, dispatch]);

    const handleFollowUser = () => {
        dispatch(
            followAndUnfollowUser({
                userIdToFollow: user._id,
            })
        );
    };

    return (
        <div className="Follower">
            <div
                className="user-info"
                onClick={() => navigate(`/profile/${user._id}`)}
            >
                <Avatar src={user?.avatar?.url} />
                <h3 className="name">{user?.name}</h3>
            </div>

            <h5
                onClick={handleFollowUser}
                className={isFollowing ? "unfollow" : "follow"}
            >
                {isFollowing ? "Following" : "Follow"}
            </h5>
        </div>
    );
}

export default Follower;
