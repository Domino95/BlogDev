import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { GlobalState } from '../../api/globalState'
import UserPopUp from './UserPopUp';
import HamburgerMenu from './HamburgerMenu';
const Logo = "BlogDev </>"

const Header = () => {
    const userName = localStorage.getItem("userName")
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.isLogged
    const [mobileView, setmobileView] = useState(() => {
        if (window.innerWidth < 1024) return true
        return false
    })

    window.addEventListener('scroll', () => handleSetNaviActive())
    function handleSetNaviActive() {
        if (window.scrollY == 0) document.querySelector('nav').classList.remove('--active')
        else document.querySelector('nav').classList.add('--active')
    }

    window.addEventListener('resize', () => handleSetmobileView())
    function handleSetmobileView() {
        if (window.innerWidth < 1024 && mobileView === false) setmobileView(true)
        if (window.innerWidth >= 1024 && mobileView === true) setmobileView(false)
    }


    return (
        <header>
            <nav>
                {mobileView ?
                    <>
                        <div className="nav__pageList"> <p>{Logo}</p> </div>
                        {isLogged && <UserPopUp setIsLogged={setIsLogged} />}
                        <HamburgerMenu isLogged={isLogged} handleSetNaviActive={handleSetNaviActive} />
                    </>
                    :
                    <>
                        <div className="nav__pageList">
                            <p>{Logo}</p>
                            <h2>   <NavLink exact to="/"> Home</NavLink></h2>
                            <h2> <NavLink exact to="/topics">Topics</NavLink></h2>
                        </div>

                        <div className="nav__logInButtons">
                            {isLogged ?
                                <>
                                    <h3>{userName}</h3>
                                    <UserPopUp setIsLogged={setIsLogged} />
                                </>
                                :
                                <>
                                    <Link to="/register"><button> Sign in</button></Link>
                                    <Link to="/login"><button> Log in</button></Link>
                                </>
                            }
                        </div>
                    </>
                }
            </nav>
        </header>
    );
}

export default Header;
