import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { generateAccessToken, generateRefreshToken } from "../utils/createToken";

export class AuthService {

    static async register(name: string, email: string, password: string){
        
        const existingUser = await User.findOne({ email });

        if(existingUser){
            throw new ApiError(400, "User already exists");
        }

        const user = await User.create({
            name,
            email,
            password
        });

        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        user.refreshToken = refreshToken;
        await user.save();

        return {
            user,
            accessToken,
            refreshToken
        };
    }

    static async login(email: string, password: string){

        const user = await User.findOne({ email }).select("+password");

        if(!user){
            throw new ApiError(401, "Invalid credentials");
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            throw new ApiError(401, "Invalid credentials");
        }

        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        user.refreshToken = refreshToken;
        await user.save();

        return {
            user,
            accessToken,
            refreshToken
        };
    }

    static async refreshToken(oldToken: string){

        const user = await User.findOne({ refreshToken: oldToken });

        if(!user){
            throw new ApiError(403, "Invalid refresh token");
        }

        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        user.refreshToken = refreshToken;
        await user.save();

        return {
            accessToken,
            refreshToken
        };
    }

    static async logout(userId: string) {
        const user = await User.findById(userId);

        if(!user){
            throw new ApiError(404, "User not found");
        }

        user.refreshToken = null;
        await user.save();

        return {
            message: "Logged out successfully"
        };
    }
}