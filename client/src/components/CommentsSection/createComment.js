import React, { useState } from 'react';

function textAreaAdjust(e) {
    e.target.style.height = '30px';
    e.target.style.height = `${e.target.scrollHeight}px`;
    if (e.target.innerHTML === "") e.target.style.height = '30px';
}

const CreateComment = ({ addComment }) => {
    const [comment, setComment] = useState({
        commentCreator: { userName: localStorage.getItem('userName') },
        content: "",
        createdAt: new Date()
    })

    const handleAddComment = () => {
        if (comment.content.length > 0) {
            setComment({ ...comment, content: "" })
            document.querySelector('#commentContainer').style.height = '30px'
            addComment(comment)
        }
    }

    return (
        <>
            <textarea id="commentContainer"
                onKeyUp={textAreaAdjust}
                value={comment.content}
                onChange={(e) => setComment({ ...comment, content: e.target.value })}
                placeholder={"Add comment"}
                className="commentSection__createPost">
            </textarea>
            <button onClick={() => handleAddComment()} className="commentSection__button"> Submit </button>
        </>
    );
}

export default CreateComment;