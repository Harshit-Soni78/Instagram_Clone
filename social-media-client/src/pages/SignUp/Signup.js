import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import { axiosClient } from "../../Utils/axiosClient";

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axiosClient.post("/auth/signup", {
                name,
                email,
                password,
            });
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="signup">
            <div className="signup-box">
                <h2 className="heading">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="name"
                        className="name"
                        id="name"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="email"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input type="submit" className="submit" value="Sign up" />
                </form>

                <div className="lines-text">
                    <span>OR</span>
                </div>

                <p className="bottom-heading">
                    Already have an account?
                    <span>
                        <Link to="/login">Log In</Link>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;
