import React from "react";
import userImage from "../../assets/user.png";
import "./Avatar.scss";

function Avatar({ src }) {
    return (
        <div className="Avatar">
            <img src={src ? src : userImage} alt="User Avatar" />
        </div>
    );
}

export default Avatar;
