import jwt from "jsonwebtoken";
import "dotenv/config";

const generateToken = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "1d", // Token expiration time
    });
    
    // Set the token in the response header
    res.cookie("token", token, {
        httpOnly: true,  // prevent XSS attacks
        sameSite: "Strict", // prevent CSRF attacks
        secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.header("Authorization", `Bearer ${token}`);
    return token;
}

export default generateToken;
 