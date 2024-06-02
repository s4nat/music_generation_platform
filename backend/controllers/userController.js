import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, email, password: hashedPassword, isAdmin });

    try {
        await user.save();
        createToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } catch (error) {
        res.status(400);
        console.error(error);
        throw new Error("Invalid user data");
    }
}
);

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log("LOG IN ATTEMPT:" + email + ", " + password);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (isPasswordCorrect) {
            createToken(res, existingUser._id);
            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            });
            return;
        }
    }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httyOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});


export { createUser, loginUser, logoutCurrentUser, getAllUsers, getUserById };