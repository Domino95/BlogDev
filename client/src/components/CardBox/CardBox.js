import React from 'react';

const CardBox = ({
    CARDBOX_USER,
    CARDBOX_DATE,
    CARDBOX_TITLE,
    CARDBOX_CONTEXT,
    CARDBOX_CATEGORY,
    CARDBOX_LEVEL
}) => {
    return (
        <>
            <div className="card_box">
                <div className="card__color">
                    <span>{CARDBOX_USER}</span>  <span>{CARDBOX_DATE}</span>
                </div>
                <h2>{CARDBOX_TITLE}</h2>
                <p>{CARDBOX_CONTEXT}</p>
                <div className="card__specification">
                    <span> {CARDBOX_CATEGORY}</span><span> {CARDBOX_LEVEL}</span>
                </div>
            </div>

        </>


    );
}

export default CardBox;