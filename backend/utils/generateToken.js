import jwt from "jsonwebtoken";

const generateTokeAndSetCookie = (user, res) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "14d",
    });

    res.cookie("token", token, {
        maxAge: 14 * 24 * 60 * 60 * 1000,//in milliseconds
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });
};

export default generateTokeAndSetCookie;