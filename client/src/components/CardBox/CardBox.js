import React from 'react';
import commentSvg from '../../img/comment.svg'
const CardBox = ({
    CARDBOX_USER,
    CARDBOX_DATE,
    CARDBOX_CATEGORY,
    CARDBOX_LEVEL,
    CARDBOX_COMMENTS,
    children
}) => {
    return (
        <>
            <div className="card_box">
                <div className="card__color">
                    <span>{CARDBOX_USER}</span>  <span>{CARDBOX_DATE}</span>
                </div>
                {children}
                <div className="card__specification">
                    <span> {CARDBOX_CATEGORY}</span><span> {CARDBOX_LEVEL}</span> <img src={commentSvg} alt="comment" />  {CARDBOX_COMMENTS}
                </div>
            </div>
        </>
    );
}

export default CardBox;