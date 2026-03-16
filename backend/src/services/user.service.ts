import { after } from "node:test";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";

export class UserService {

    static async getCurrentUser(userId: string) {
        const user = await User.findById(userId).select("-password -refreshToken");

        if(!user){
            throw new ApiError(404, "User not found");
        }

        return user;
    }

    static async updateProfile(userId: string , data: any){

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            data,
            { returnDocument : "after"} 
        ).select("-password -refreshToken");

        if(!updatedUser){
            throw new ApiError(404, "User not found");
        }

        return updatedUser;
    }

    static async changePassword(userId: string, oldPasssword: string, newPassword: string){

        const user = await User.findById(userId).select("+password");

        if(!user){
            throw new ApiError(404, "User not found");
        }

        const isMatch = await user.comparePassword(oldPasssword);

        if(!isMatch){
            throw new ApiError(400, "Invalid old password");
        }

        user.password = newPassword;

        await user.save();
    }

    static async deleteUser(userId: string){
        const user = await User.findByIdAndDelete(userId);

        if(!user){
            throw new ApiError(404, "User not found");
        }
    }
}