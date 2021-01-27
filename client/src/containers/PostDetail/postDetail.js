import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom'
import CommentSection from '../../components/CommentsSection/commentSection'
import CardBox from "../../components/CardBox/CardBox";
import WithStaticContent from '../../components/CardBox/hoc/withStatisContent'
import Spinner from "../../components/Spinner/spinner";
import axios from 'axios'
import { GlobalState } from '../../api/globalState'
const CardBoxWithStaticContent = WithStaticContent(CardBox);

const PostDetail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const location = useLocation();
    const state = useContext(GlobalState)
    document.title = "BlogDev - Details"
    const { updatePostGlobally } = state.postsAPI


    useEffect(() => {
        const getPost = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`/post/getPost${location.search}`)
                setPost(response.data);
                setComments(response.data.comments)
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        getPost()
    }, [])

    const addComment = async (comment) => {
        setComments([...comments, comment])
        updatePostGlobally(post._id, comment)
        try {
            await axios.post('/comment/add', {
                postId: post._id,
                commentContent: comment.content
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="postDetail">

            { isLoading && <Spinner />}

            <CardBoxWithStaticContent
                title={post.title}
                content={post.content}
                userName={post.creator && post.creator.userName}
                date={new Date(post.createdAt).toLocaleString().slice(0, -3)}
                category={post.category}
                level={post.level}
                commentsLength={comments && comments.length}
            />
            <CommentSection
                comments={comments}
                addComment={addComment}
            />
        </div>
    );
}

export default PostDetail;