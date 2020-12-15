import React from 'react';
import { constants } from '../../../constants/constants'

export default (Component) => {
    const children = (
        <>
            <h2>{constants.HOME_PAGE_CARDBOX_TITLE}</h2>
            <p>{constants.HOME_PAGE_CARDBOX_CONTENT}</p>
        </>
    )
    return (props) => (
        <Component
            {...props}
            children={children}
            CARDBOX_USER={constants.HOME_PAGE_CARDBOX_USER}
            CARDBOX_DATE={constants.HOME_PAGE_CARDBOX_DATE}
            CARDBOX_CATEGORY={constants.HOME_PAGE_CARDBOX_CATEGORY}
            CARDBOX_LEVEL={constants.HOME_PAGE_CARDBOX_LEVEL}
        />
    );
};
