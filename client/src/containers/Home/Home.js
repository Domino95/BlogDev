import React from 'react'
import peopleImg from '../../img/11115.jpg'
import Wave3 from '../../img/wave3.svg'
import Wave2 from '../../img/wave2.svg'
import { array } from './section3array'
const Home = () => {

    function generateSlider(e) {
        let column = document.querySelectorAll('.column')
        let slider = document.querySelector('.slider')
        switch (e.target.id) {
            case "add":
                console.log(column[0].offsetWidth * 6, slider.scrollLeft)
                if (column[0].offsetWidth * 6 <= slider.scrollLeft) {
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

                <div className="home__secondSection__card">
                    <div className="card__color">
                        <span>John</span>  <span>30-11-2020 14:20</span>
                    </div>
                    <h2>How to center element</h2>
                    <p>To horizontally center a block element use margin: auto;

                    Setting the width of the element will prevent it from stretching out to the edges of its container.

The element will then take up the specified width, and the remaining space will be split equally between the two margins</p>
                    <div className="card__specification">
                        <span> CSS</span><span> Beginner</span>
                    </div>
                </div>

                <div className="home__secondSection__box">
                    <h1>Choose content</h1>
                    <p>Choose content by the topics that interest you most and
                         share your knowledge with others</p>
                    <button>Search Topic</button>
                </div>
            </div>
            <h1 className="home__title">Let's talk about</h1>
            <div className="home__thirdSection">
                <button id="minus" onClick={(e) => generateSlider(e)} />
                <button id="add" onClick={(e) => generateSlider(e)} />
                <div className="slider">
                    {array.map((item, index) => {
                        return (item &&
                            <div key={index} className="column">
                                <img src={item.src}></img>
                            </div>)
                    })}
                </div>

            </div>
        </div >
    );
}

export default Home;