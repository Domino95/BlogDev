import React from 'react';
import { useLocation } from 'react-router-dom'
import CardBox from "../../components/CardBox/CardBox";
import WithStaticContent from '../../components/CardBox/hoc/withStatisContent'
const CardBoxWithStaticContent = WithStaticContent(CardBox);

const PostDetail = () => {
    const location = useLocation();
    const post = <CardBoxWithStaticContent
        title={location.state.title}
        content={location.state.content}
        userName={location.state.creator.userName}
        date={location.state.date}
        category={location.state.category}
        level={location.state.level}
        commentsLength={location.state.comments.length}
    />

    return (
        <div className="postDetail">
            {post}
        </div>
    );
}

export default PostDetail;