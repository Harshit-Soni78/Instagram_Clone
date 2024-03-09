import React, { useRef, useState } from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { GoUnmute } from "react-icons/go";
import { IoVolumeMuteSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { likeAndUnlikePost } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";
import Comments from "../comments/Comments";
import PostOptions from "../postOptions/PostOptions";

function Post({ post }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openComments, setOpenComments] = useState(false);
    const [openPostOptions, setOpenPostOptions] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handlePostLikes = () => {
        dispatch(
            likeAndUnlikePost({
                postId: post._id,
            })
        );
    };

    const handleMuteUnmute = () => {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <div className="Post">
            <div className="heading">
                <div
                    className="left"
                    onClick={() => navigate(`/profile/${post.owner._id}`)}
                >
                    <Avatar src={post.owner?.avatar?.url} />
                    <h3 className="heading-name">{post?.owner?.name}</h3>
                    <h3 className="time-ago">• {post?.timeAgo}</h3>
                </div>

                <div
                    className="right"
                    onClick={() => setOpenPostOptions(!openPostOptions)}
                >
                    <BsThreeDots />
                </div>
                {openPostOptions && (
                    <PostOptions
                        closePostOptions={() => setOpenPostOptions(false)}
                        post={post}
                    />
                )}
            </div>
            <div className="content">
                {!post?.isVideo ? (
                    <img src={post?.image?.url} alt="Post" />
                ) : (
                    <video
                        ref={videoRef}
                        loop
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        controls={false}
                        onClick={handlePlayPause}
                        style={{ objectFit: "cover" }}
                        height={"100%"}
                        width={"100%"}
                        src={post?.image?.url}
                    ></video>
                )}
                {post?.isVideo && (
                    <button onClick={handleMuteUnmute}>
                        {isMuted ? <IoVolumeMuteSharp /> : <GoUnmute />}
                    </button>
                )}
            </div>
            <div className="footer">
                <div className="likes-comments">
                    {post.isLiked ? (
                        <AiFillHeart
                            className="icon liked"
                            onClick={handlePostLikes}
                        />
                    ) : (
                        <AiOutlineHeart
                            className="icon"
                            onClick={handlePostLikes}
                        />
                    )}
                    <div
                        className="comment"
                        onClick={() => setOpenComments(!openComments)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-label="Comment"
                            className="_ab6-"
                            color="#262626"
                            fill="#262626"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                            <path
                                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                fill="none"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                    {openComments && (
                        <Comments
                            closeComments={() => setOpenComments(false)}
                            post={post}
                            setOpenComments={setOpenComments}
                        />
                    )}
                </div>

                <h3 className="likesCount">{`${post.likesCount} likes`}</h3>
                <div className="caption-container">
                    <h3
                        className="heading-name"
                        onClick={() => navigate(`/profile/${post.owner._id}`)}
                    >
                        {post?.owner?.name}
                    </h3>
                    <p className="caption">{post.caption}</p>
                </div>
            </div>
        </div>
    );
}

export default Post;
