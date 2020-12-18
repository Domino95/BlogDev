import React from 'react'
import peopleImg from '../../img/11115.jpg'
import BackgroundImg from '../../components/BackgroundImg/BackgroundImg'
import { arrayImg } from '../../constants/imagesArray'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CardBox from '../../components/CardBox/CardBox'
import { constants } from '../../constants/constants'
import WithStaticContent from '../../components/CardBox/hoc/withStatisContent'

const CardBoxWithStaticContent = WithStaticContent(CardBox)
const Home = () => {

    function generateSlider(e) {
        let column = document.querySelectorAll('.column')
        let slider = document.querySelector('.slider')
        switch (e.target.id) {
            case "add":
                if (column[0].offsetWidth * 6 <= (slider.scrollLeft + 2)) {
                    slider.scrollLeft = 0
                }
                else (slider.scrollLeft += column[0].offsetWidth)
                break;
            case "minus":
                if (slider.scrollLeft === 0) {
                    slider.scrollLeft = slider.offsetWidth + (2 * column[0].offsetWidth)
                }
                else
                    (slider.scrollLeft -= column[0].offsetWidth)
                break;
            default:
                return "something wrong..."
        }
    }

    return (
        < div className="home" >

            <div className="home__firstSection">
                <div className="home__firstSection__box">
                    <h1>Welcome to the BlogDev</h1>
                    <p>This is a simple app that allows you to exchange knowledge with other people</p>
                    <button>Get started</button>
                </div>
                <img src={peopleImg} alt="peopleImg" />
            </div>

            <div className="home__secondSection">
                <BackgroundImg />
                <CardBoxWithStaticContent
                    title={constants.HOME_PAGE_CARDBOX_TITLE}
                    content={constants.HOME_PAGE_CARDBOX_CONTENT}
                    userName={constants.HOME_PAGE_CARDBOX_USER}
                    date={constants.HOME_PAGE_CARDBOX_DATE}
                    category={constants.HOME_PAGE_CARDBOX_CATEGORY}
                    level={constants.HOME_PAGE_CARDBOX_LEVEL}


                />
                <div className="home__secondSection__box">
                    <h1>Choose content</h1>
                    <p>Choose content by the topics that interest you most and
                         share your knowledge with others</p>
                    <button>Search Topic</button>
                </div>
            </div>

            <h1 className="home_title_ThirdSection">Let's talk about</h1>
            <div className="home__thirdSection">
                <button className="control_button" id="minus" onClick={(e) => generateSlider(e)} />
                <button className="control_button" id="add" onClick={(e) => generateSlider(e)} />
                <div className="slider">
                    {arrayImg.map((item, index) => {
                        return (item &&
                            <div key={index} className="column">
                                <LazyLoadImage src={item.src}></LazyLoadImage>
                            </div>)
                    })}
                </div>

            </div>
        </div >
    );
}

export default Home;