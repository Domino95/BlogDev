import React from 'react';
import CardBox from '../../components/CardBox/CardBox'
import WithStaticContent from '../../components/CardBox/hoc/withStatisContent'
const CardBoxWithStaticContent = WithStaticContent(CardBox)


const PostsList = ({ posts, text }) => {

    function generateSlider(e) {
        let element = document.querySelectorAll(`.element`)
        let slider = document.querySelector(`.slider`)
        console.log(element, slider)
        switch (e.target.id) {
            case "add":
                slider.scrollLeft += element[0].offsetWidth
                break;
            case "minus":
                slider.scrollLeft -= element[0].offsetWidth
                break;
            default:
                return "something wrong..."
        }
    }

    return (
        <>
            <h1>{text} ({posts && posts.length})</h1>
            <div className="posts__list">
                {posts && posts.length > 1 ?
                    <>
                        <button className="control_button" id="minus" onClick={(e) => generateSlider(e)} />
                        <button className="control_button" id="add" onClick={(e) => generateSlider(e)} />
                    </>
                    : null
                }

                <div className="slider" >
                    {posts && posts.map((post, index) => {
                        return <div key={index} className="element">
                            <CardBoxWithStaticContent
                                key={index}
                                title={post.title}
                                content={post.content}
                                userName={post.creator.userName}
                                date={post.date}
                                category={post.category}
                                level={post.level} />
                        </div>
                    })}
                </div>

            </div>
        </>
    );
}

export default PostsList;