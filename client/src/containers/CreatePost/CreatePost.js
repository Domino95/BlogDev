import React, { useState } from 'react';
import { arrayImg } from '../../constants/imagesArray'
import ReturnSvg from '../../constants/LevelSvg'
import CardBox from '../../components//CardBox/CardBox'
import WithDynamicContent from '../../components/CardBox/hoc/withDynamicContent'
import axios from 'axios'
import Spinner from '../../components/Spinner/spinner'
const CardBoxWithDynamicContent = WithDynamicContent(CardBox)

const CreatePost = () => {
    const [error, setError] = useState("")
    const [laoding, setLoading] = useState(false)
    const [post, setPost] = useState({
        title: "", content: "", level: null, category: null
    })

    const handlePost = (name, e) => {
        const { id, value } = e.target;
        if (name && post[id] === name) setPost({ ...post, [id]: null })
        else if (name) setPost({ ...post, [id]: name })
        else setPost({ ...post, [id]: value })
    }
    const validate = () => {
        if (post.title.length > 5 && post.content.length > 50 && post.level && post.category) return true
        else return false
    }

    const sendPost = async () => {
        document.querySelector('body').style.overflow = "hidden"
        setLoading(true)
        if (!validate()) {
            setError("Please complete all variants")
            document.querySelector('body').style.overflow = "auto"
            setLoading(false)
        }
        else {
            document.querySelector('body').style.overflow = "auto"
            setLoading(false)
        }
    }


    return (
        <>
            <div className="topics">
                {laoding && <Spinner />}

                <h2>Topics</h2>
                <p>Browse content by the topics that interest you most</p>

                <div className="topics__list">
                    {arrayImg.map((image, index) => {
                        return (
                            <div id="category"
                                onClick={(e) => handlePost(image.name, e)}
                                key={index}
                                className={post.category === image.name ? "topics__element checked" : "topics__element"} >
                                <img src={image.src} />
                                <h3>{image.name}</h3>
                            </div>
                        )
                    })}
                </div>

                <div className="topics__level">

                    <h2>Level</h2>
                    <p>Select the level of the topic</p>
                    <div className="topics__list">

                        <div id="level" className={post.level === 'beginner' ? "topics__element checked" : "topics__element"}
                            onClick={(e) => handlePost('beginner', e)}>
                            <ReturnSvg level="beginner" />
                            <h3>Beginner</h3>
                        </div>

                        <div id="level" className={post.level === 'medium' ? "topics__element checked" : "topics__element"}
                            onClick={(e) => handlePost('medium', e)}>
                            <ReturnSvg level="medium" />
                            <h3>Medium</h3>
                        </div>

                        <div id="level" className={post.level === 'advanced' ? "topics__element checked" : "topics__element"}
                            onClick={(e) => handlePost('advanced', e)}>
                            <ReturnSvg level="advanced" />
                            <h3>Advanced</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="postCreator">
                <CardBoxWithDynamicContent post={post} sendPost={() => sendPost()} handlePost={(e) => handlePost(name, e)} />
                <h2>{error}</h2>
            </div>
        </>
    );
}

export default CreatePost;
