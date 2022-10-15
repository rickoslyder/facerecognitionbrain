/* eslint-disable react/prop-types */
import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit, activeUser }) => {
    return (
        <div>
            <p className="f3">
                This Magic Brain will detect faces in your pictures - give it a try!
            </p>
            {activeUser !== null && <div >
                <div className='center form-squares-alt pa4 b3 shadow-5'>
                    <input onChange={onInputChange} className='f4 pa2 w-70 center' type='text' placeholder='Enter image URL here..' />
                    <button onClick={onButtonSubmit} className='w-30 grow f4 link ph3 pv2 dib black bg-light-blue pointer'>Detect</button>
                </div>
            </div>}
        </div>
    )
}

export default ImageLinkForm;