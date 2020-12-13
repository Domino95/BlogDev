import React from 'react'
import peopleImg from '../../img/11115.jpg'
import Wave3 from '../../img/wave3.svg'
import Wave2 from '../../img/wave2.svg'
import { array } from './section3array'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CardBox from '../../components/CardBox/CardBox'
import { constants } from '../../constants/constants'

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
                <div className="backgroundImageWaves">
                    <img className="Wave1" src={Wave3} alt="footerSvg" />
                    <img className="Wave2" src={Wave2} alt="footerSvg" />
                </div>
                <CardBox
                    CARDBOX_USER={constants.HOME_PAGE_CARDBOX_USER}
                    CARDBOX_DATE={constants.HOME_PAGE_CARDBOX_DATE}
                    CARDBOX_TITLE={constants.HOME_PAGE_CARDBOX_TITLE}
                    CARDBOX_CONTEXT={constants.HOME_PAGE_CARDBOX_CONTEXT}
                    CARDBOX_CATEGORY={constants.HOME_PAGE_CARDBOX_CATEGORY}
                    CARDBOX_LEVEL={constants.HOME_PAGE_CARDBOX_LEVEL}
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
                <button id="minus" onClick={(e) => generateSlider(e)} />
                <button id="add" onClick={(e) => generateSlider(e)} />
                <div className="slider">
                    {array.map((item, index) => {
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