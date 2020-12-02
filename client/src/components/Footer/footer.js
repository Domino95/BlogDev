import React from 'react';
import Wave1 from '../../img/wave1.svg'
import Facebook from '../../img/facebook.svg'
import Isntagram from '../../img/instagram.svg'
import Twitter from '../../img/twitter.svg'
import Linkedin from '../../img/linkedin.svg'
import Snap from '../../img/snapchat.svg'
import Youtube from '../../img/youtube-play.svg'

const Logo = "BlogDev </>"

const Footer = () => {
    return (
        <>
            <img className="footerWave" src={Wave1} alt="footerSvg" ></img>
            <footer>
                <h1>{Logo}</h1>
            </footer>
        </>
    );
}

export default Footer;