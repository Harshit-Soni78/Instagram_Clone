const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");

const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            // return res.status(400).send("All feilds are required!");
            return res.send(error(400, "All feilds are required!"));
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            // return res.status(409).send("User already exist!");
            return res.send(error(409, "User already exist!"));
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });

        // return res.status(201)json({
        //   user,
        // });

        return res.send(success(201, "New user is created!"));
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            // return res.status(400).send("All feilds are required!");
            return res.send(error(400, "All feilds are required!"));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            // return res.status(404).send("User does not exist!");
            return res.send(error(404, "User does not exist, Signup!"));
        }

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) {
            // return res.status(403).send("Incorrect Password!");
            return res.send(error(403, "Incorrect Password!"));
        }

        const accessToken = generateAccessToken({
            _id: user._id,
        });
        const refreshToken = generateRefreshToken({
            _id: user._id,
        });

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
        });

        // return res.json({ accessToken });

        return res.send(success(200, { accessToken }));
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

const refreshAccessTokenController = async (req, res) => {
    const cookies = req.cookies.jwt;

    if (!cookies) {
        // return res.status(401).send("Refresh token in cookie is required");
        return res.send(error(401, "Refresh token in cookie is required!"));
    }

    const refreshToken = cookies;

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

        const _id = decoded._id;
        const accessToken = generateAccessToken({ _id });

        // return res.status(201).json({ accessToken });
        return res.send(success(201, { accessToken }));
    } catch (err) {
        console.log(err);
        // return res.status(401).send("Invalid refresh token");
        return res.send(error(401, "Invalid refresh token!"));
    }
};

const logoutController = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
        });
        return res.send(success(200, "user logged out"));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

//internal functions
const generateAccessToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_KEY, {
            expiresIn: "1d",
        });
        return token;
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

const generateRefreshToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.REFRESH_TOKEN_KEY, {
            expiresIn: "1y",
        });
        return token;
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

module.exports = {
    signupController,
    loginController,
    refreshAccessTokenController,
    logoutController,
};
