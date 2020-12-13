import React, { useState } from 'react';
import Img from '../../img/3236267.jpg'
import { NavLink, Link } from 'react-router-dom';

const HamburgerMenu = ({ isLogged, handleSetNaviActive }) => {
    const [hamburgerActive, sethamburgerActive] = useState(false)

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
        <>
            <div className="nav__hamburger" onClick={handleHamburgerMenuActive}>
                <div className={hamburgerActive ? "hamburgerMenu open" : "hamburgerMenu"}></div>
            </div>

            {hamburgerActive &&
                <div className="nav__pageList__mobile">
                    <img src={Img} alt="man" />
                    <h2>   <NavLink onClick={handleHamburgerMenuActive} exact to="/"> Home</NavLink></h2>
                    <h2> <NavLink onClick={handleHamburgerMenuActive} to="/topics">Topics</NavLink></h2>
                    <div className="nav__logInButtons">
                        {!isLogged &&
                            <>
                                <Link onClick={handleHamburgerMenuActive} to="/register"><button> Sign in</button></Link>
                                <Link onClick={handleHamburgerMenuActive} to="/login"><button> Log in</button></Link>
                            </>
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default HamburgerMenu;