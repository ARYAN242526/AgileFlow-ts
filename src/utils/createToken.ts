import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const generateAccessToken = (userId: string) => {

    return jwt.sign(
        {id: userId} , 
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "15m" }
    );
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "7d" }
    );
};