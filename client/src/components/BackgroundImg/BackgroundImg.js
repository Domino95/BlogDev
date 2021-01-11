import React from 'react';
import Wave3 from '../../img/wave3.svg'
import Wave2 from '../../img/wave2.svg'

const BackgroundImg = () => {
    return (
        <div className="backgroundImageWaves">
            <img className="Wave1" src={Wave3} alt="footerSvg" />
            <div />
            <img className="Wave2" src={Wave2} alt="footerSvg" />
        </div>
    );
}

export default BackgroundImg;