/* eslint-disable react/prop-types */
import React from 'react';
// import './ImageLinkForm.css'

const Rank = ({ name, entries }) => {
    console.log("Rendering rank - user", name, "has", entries, "entries")
    return (
        <div>
            <div className='white f3 fw8'>
               {`${name}, your current entry count is...`} 
            </div>
            <div className='white f1 fw9'>
               {`${entries}`} 
            </div>
        </div>
    )
}

export default Rank;