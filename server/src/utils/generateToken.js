import jwt from "jsonwebtoken";
import "dotenv/config";

const generateToken = (userId,userRole,res) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not defined in environment");
    }

 const token = jwt.sign({ id: userId}, process.env.JWT_SECRET, {
    expiresIn: "30m"
});


    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 24 * 60 * 60 * 1000,
    });

    // Optional: Only if you need to send token via header too
    res.header("Authorization", `Bearer ${token}`);

    return token;
};

export default generateToken;
