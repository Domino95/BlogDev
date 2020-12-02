import React, { useState } from 'react';
import Img from '../../img/3236267.jpg'
const Logo = "BlogDev </>"

const Header = () => {
    const [hamburgerActive, sethamburgerActive] = useState(false)
    const [mobileView, setmobileView] = useState(() => {
        if (window.innerWidth < 1024) return true
        return false
    })
    function handleSetNaviActive() {
        if (window.scrollY == 0) document.querySelector('nav').classList.remove('--active')
        else document.querySelector('nav').classList.add('--active')
    }
    function handleSetmobileView() {
        if (window.innerWidth < 1024 && mobileView === false) setmobileView(true)
        if (window.innerWidth >= 1024 && mobileView === true) setmobileView(false)
    }

    window.addEventListener('scroll', () => handleSetNaviActive())
    window.addEventListener('resize', () => handleSetmobileView())


    const handleHamburgerMenuActive = function () {
        if (hamburgerActive) {
            sethamburgerActive(false)
            document.querySelector('body').style.overflow = "auto"
            document.querySelector('nav').classList.remove('--open')
            handleSetNaviActive()
        }
        else {
            sethamburgerActive(true)
            document.querySelector('body').style.overflow = "hidden"
            document.querySelector('nav').classList.add('--open')
        }
    }

    return (
        <header>
            <nav>
                {mobileView ?
                    <>
                        <div className="nav__list">
                            <p>{Logo}</p>
                        </div>
                        <div className="nav__hamburger" onClick={handleHamburgerMenuActive}>
                            <div className={hamburgerActive ? "hamburgerMenu open" : "hamburgerMenu"}></div>
                        </div>
                        {hamburgerActive &&
                            <div className="nav__list__mobile">
                                <img src={Img} alt="man" />
                                <h2>Home</h2>
                                <h2>Topics</h2>
                                <div className="nav__logInButtons">
                                    <button>Sign in</button>
                                    <button> Log in</button>
                                </div>
                            </div>
                        }
                    </>
                    :
                    <>
                        <div className="nav__list">
                            <p>{Logo}</p>
                            <p>Home</p>
                            <p>Topics</p>
                        </div>
                        <div className="nav__logInButtons">
                            <button>Sign in</button>
                            <button> Log in</button>
                        </div>
                    </>
                }
            </nav>
        </header>
    );
}

export default Header;
