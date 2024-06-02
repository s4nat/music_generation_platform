import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, "mysecretkey", {
        expiresIn: "30d",
    });

    // Set JWT as an HTTP-only cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return token;
};

export default generateToken;

