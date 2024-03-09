import React, { useEffect, useRef, useState } from "react";
import "./Profile.scss";
import { useNavigate, useParams } from "react-router-dom";
import userImage from "../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postSlice";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";
import Comments from "../comments/Comments";
import FollowerBox from "../followerBox/FollowerBox";
import { GoUnmute } from "react-icons/go";
import { IoVolumeMuteSharp } from "react-icons/io5";
import FollowingBox from "../followingBox/FollowingBox";

function Profile() {
    const navigate = useNavigate();
    const params = useParams();
    const userProfile = useSelector((state) => state.postReducer.userProfile);
    const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
    const feedData = useSelector((state) => state.feedDataReducer.feedData);
    const dispatch = useDispatch();
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [isFollowing, setIsFollowing] = useState();
    const [openComments, setOpenComments] = useState(false);
    const [openFollowers, setOpenFollowers] = useState(false);
    const [openFollowing, setOpenFollowing] = useState(false);
    const [postId, setPostId] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef(null);
    const userImg = userProfile?.avatar?.url;

    useEffect(() => {
        dispatch(
            getUserProfile({
                userId: params.userId,
            })
        );
        setIsMyProfile(feedData?._id === params.userId);

        setIsFollowing(
            feedData?.followings?.find((item) => item._id === params.userId)
        );
    }, [myProfile, params.userId, feedData, dispatch]);

    const handleFollowUser = () => {
        dispatch(
            followAndUnfollowUser({
                userIdToFollow: params.userId,
            })
        );
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleMuteUnmute = () => {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <div className="Profile">
            <div className="profile-container">
                <div className="upper-part">
                    <div className="profile-card">
                        <div className="user-profile">
                            <img
                                className="user-img"
                                src={userImg ? userImg : userImage}
                                alt="User"
                            />
                            <div className="user-details">
                                <div className="user-name">
                                    <h2 className="name">
                                        {userProfile?.name}
                                    </h2>
                                    {isMyProfile && (
                                        <button
                                            className="edit-profile "
                                            onClick={() => {
                                                navigate("/updateProfile");
                                            }}
                                        >
                                            Edit profile
                                        </button>
                                    )}
                                    {!isMyProfile && (
                                        <button
                                            onClick={handleFollowUser}
                                            className={
                                                isFollowing
                                                    ? "following"
                                                    : "follow"
                                            }
                                        >
                                            {isFollowing
                                                ? "Following"
                                                : "Follow"}
                                        </button>
                                    )}
                                </div>
                                <div className="follower-info">
                                    <div className="posts">
                                        <h3> {userProfile?.posts?.length}</h3>
                                        <p>posts</p>
                                    </div>
                                    <div
                                        className="followers"
                                        onClick={() =>
                                            setOpenFollowers(!openFollowers)
                                        }
                                    >
                                        <h3>
                                            {userProfile?.followers?.length}
                                        </h3>
                                        <p>followers</p>
                                    </div>
                                    {openFollowers && (
                                        <FollowerBox
                                            closeFollowers={() =>
                                                setOpenFollowers(false)
                                            }
                                            setOpenFollowers={setOpenFollowers}
                                        />
                                    )}
                                    <div
                                        className="followings"
                                        onClick={() =>
                                            setOpenFollowing(!openFollowing)
                                        }
                                    >
                                        <h3>
                                            {userProfile?.followings?.length}
                                        </h3>
                                        <p>following</p>
                                    </div>
                                    {openFollowing && (
                                        <FollowingBox
                                            closeFollowing={() =>
                                                setOpenFollowing(false)
                                            }
                                            setOpenFollowing={setOpenFollowing}
                                        />
                                    )}
                                </div>
                                <p className="bio">{userProfile?.bio}</p>
                            </div>
                        </div>
                        <div className="user-bio">{userProfile?.bio}</div>
                    </div>
                </div>
                <div className="middle-part">
                    <div className="follower-info">
                        <div className="posts">
                            <h3> {userProfile?.posts?.length}</h3>
                            <p>posts</p>
                        </div>
                        <div
                            className="followers"
                            onClick={() => setOpenFollowers(!openFollowers)}
                        >
                            <h3>{userProfile?.followers?.length}</h3>
                            <p>followers</p>
                        </div>
                        {openFollowers && (
                            <FollowerBox
                                closeFollowers={() => setOpenFollowers(false)}
                                setOpenFollowers={setOpenFollowers}
                            />
                        )}
                        <div
                            className="followings"
                            onClick={() => setOpenFollowing(!openFollowing)}
                        >
                            <h3>{userProfile?.followings?.length}</h3>
                            <p>following</p>
                        </div>
                        {openFollowing && (
                            <FollowingBox
                                closeFollowing={() => setOpenFollowing(false)}
                                setOpenFollowing={setOpenFollowing}
                            />
                        )}
                    </div>
                </div>
                <div className="lower-part">
                    <div className="user-images">
                        {userProfile?.posts?.map((post) => (
                            <div
                                key={post._id}
                                className="image"
                                onClick={() => {
                                    setOpenComments(!openComments);
                                    setPostId(post);
                                }}
                            >
                                <div className="single-image">
                                    {post?.isVideo ? (
                                        <video
                                            ref={videoRef}
                                            onPlay={() => setIsPlaying(true)}
                                            onPause={() => setIsPlaying(false)}
                                            controls={false}
                                            onClick={handlePlayPause}
                                            style={{ objectFit: "cover" }}
                                            height={"100%"}
                                            width={"100%"}
                                            src={post?.image?.url}
                                        />
                                    ) : (
                                        <img
                                            src={post?.image?.url}
                                            alt="user post"
                                        />
                                    )}
                                    {post?.isVideo && (
                                        <button onClick={handleMuteUnmute}>
                                            {isMuted ? (
                                                <IoVolumeMuteSharp />
                                            ) : (
                                                <GoUnmute />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {openComments && (
                            <Comments
                                closeComments={() => setOpenComments(false)}
                                post={postId}
                                setOpenComments={setOpenComments}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
