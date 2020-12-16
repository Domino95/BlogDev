import mongoose from 'mongoose';
import User from '../interfaces/user'


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)
export const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);