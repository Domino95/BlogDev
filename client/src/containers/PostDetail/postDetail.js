import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import CommentSection from '../../components/CommentsSection/commentSection'
import CardBox from "../../components/CardBox/CardBox";
import WithStaticContent from '../../components/CardBox/hoc/withStatisContent'
import Spinner from "../../components/Spinner/spinner";
import axios from 'axios'
const CardBoxWithStaticContent = WithStaticContent(CardBox);

const PostDetail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState({});
    const location = useLocation();

    useEffect(() => {
        const getPosts = async () => {
            if (location.state) {
                setPost(location.state)
            }
            else {
                try {
                    setIsLoading(true);
                    const response = await axios.get(`/post/getPost${location.search}`)
                    setPost(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
            setIsLoading(false);
        };
        getPosts()
    }, [])

    return (
        <div className="postDetail">

            { isLoading && <Spinner />}
            <CardBoxWithStaticContent
                title={post.title}
                content={post.content}
                userName={post.creator && post.creator.userName}
                date={post.date}
                category={post.category}
                level={post.level}
                commentsLength={post.comments && post.comments.length}
            />
            <CommentSection />
        </div>
    );
}

export default PostDetail;