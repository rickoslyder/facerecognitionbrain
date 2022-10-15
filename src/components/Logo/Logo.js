import React from 'react';
import Tilt from 'react-parallax-tilt';
import "./Logo.css";

const Logo = () => {
    return (
        <div className='ma4 mt0 logo'>
            <Tilt>
                <div className="dib tc br-pill v-mid ba" style={{ height: '150px', width: '270px', backgroundColor: '#7CFBF4' }}>
                    <h1 className='f1 logoText'>SmartBrain 🧠</h1>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;