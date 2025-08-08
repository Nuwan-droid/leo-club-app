import jwt from "jsonwebtoken";
<<<<<<< HEAD
=======
import "dotenv/config";
>>>>>>> 1ca627577843a7ae33fdb2e8d324e1011c9fae89

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

<<<<<<< HEAD
export default generateToken;
=======
export default generateToken;
 
>>>>>>> 1ca627577843a7ae33fdb2e8d324e1011c9fae89
