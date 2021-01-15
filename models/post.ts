import mongoose from 'mongoose';
import postInterface from '../interfaces/post'
import commentSchema from './comment'

const postSchema = new mongoose.Schema({
    creator: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    comments: [commentSchema]
},
    {
        timestamps: true
    }
)

const postModel = mongoose.model<postInterface & mongoose.Document>('Post', postSchema);
export default postModel