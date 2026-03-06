import mongoose , {Document , Schema} from "mongoose";
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string
    email: string
    password: string
    role: "Admin" | "ProjectManager" | "Developer"
    refreshToken?: string | null
    comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            select: false 
        },
        refreshToken: {
            type: String,
            select: false,
            default: null
        },
    },
    {
        timestamps: true
    }
)

// hash password before save
userSchema.pre("save" , async function () {
    if(!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password , salt);
})

// compare password method
userSchema.methods.comparePassword = async function (password: string){
    return bcrypt.compare(password, this.password);
}

export const User = mongoose.model<IUser>("User" , userSchema);