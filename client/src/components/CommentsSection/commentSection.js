import React from 'react';
import CreateComment from './createComment'
const CommentSection = () => {
    return (
        < div className="commentSection">
            <h3>Comments</h3>
            <CreateComment />
        </div>
    );
}

export default CommentSection;