import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    creator: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
    },
    content: String,
},
    {
        timestamps: true
    }
);
export default commentSchema
