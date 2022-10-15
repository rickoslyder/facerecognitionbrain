/* eslint-disable react/prop-types */
import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
        console.log("Is user signed in?", isSignedIn);
        return (
            (isSignedIn) ?
            (<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                {/* <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p> */}
                <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal}/>
            </nav>)
            :
            (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
                </nav>
            )
        )
}

export default Navigation