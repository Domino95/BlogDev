import mongoose from 'mongoose';
import userInterface from '../interfaces/user'


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
export const userModel = mongoose.model<userInterface & mongoose.Document>('User', userSchema);