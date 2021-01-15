import React from 'react';
function textAreaAdjust(e) {
    e.target.style.height = '25px';
    e.target.style.height = `${e.target.scrollHeight}px`;
}

const CreateComment = () => {

    return (
        <>
            <textarea onKeyUp={textAreaAdjust} className="commentSection__createPost"></textarea>
            <button className="commentSection__button">Submit</button>
        </>
    );
}

export default CreateComment;