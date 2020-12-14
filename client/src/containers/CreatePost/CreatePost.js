import React, { useState } from 'react';
import { arrayImg } from '../../constants/imagesArray'
import ReturnSvg from '../../constants/LevelSvg'
import CardBox from '../../components//CardBox/CardBox'
const CreatePost = () => {
    const [categoryChecked, setCategoryChecked] = useState()
    const [levelChecked, setLevelChecked] = useState()

    function chooseCategory(name) {
        if (categoryChecked === name) setCategoryChecked(null)
        else setCategoryChecked(name)
    }
    function chooseLevel(name) {
        if (levelChecked === name) setLevelChecked(null)
        else setLevelChecked(name)
    }


    return (
        <>
            <div className="topics">

                <h2>Topics</h2>
                <p>Browse content by the topics that interest you most</p>

                <div className="topics__list">
                    {arrayImg.map((image, index) => {
                        return (
                            <div
                                onClick={() => chooseCategory(image.name)}
                                key={index}
                                className={categoryChecked === image.name ? "topics__element checked" : "topics__element"} >
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
                        <div className={levelChecked === 'beginner' ? "topics__element checked" : "topics__element"}
                            onClick={() => chooseLevel('beginner')}>
                            <ReturnSvg level="beginner" />
                            <h3>Beginner</h3>
                        </div>

                        <div className={levelChecked === 'medium' ? "topics__element checked" : "topics__element"}
                            onClick={() => chooseLevel('medium')}>
                            <ReturnSvg level="medium" />
                            <h3>Medium</h3>
                        </div>

                        <div className={levelChecked === 'advanced' ? "topics__element checked" : "topics__element"}
                            onClick={() => chooseLevel('advanced')}>
                            <ReturnSvg level="advanced" />
                            <h3>Advanced</h3>
                        </div>
                    </div>
                </div>
            </div>

            <CardBox />

        </>
    );
}

export default CreatePost;