import React from 'react';
import CreateComment from './createComment'

const CommentSection = ({ comments, addComment }) => {
    console.log(comments)
    return (
        < div className="commentSection">
            <h2> {comments && comments.length} Comments</h2>
            <CreateComment addComment={addComment} />

            {comments.length > 0 && comments.map((item, index) => {
                return (
                    < div className="commentSection__commentContainer" key={index}>
                        <div className="commentSection__userNameAndDateContainer">
                            <h4>{item.commentCreator.userName}</h4>
                            <h5> {new Date(item.createdAt).toLocaleString().slice(0, -3)} </h5>
                        </div>
                        <p>{item.content}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default CommentSection;