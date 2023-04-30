import React from 'react';
import "./IntroTile.css"


// import { useDispatch } from "react-redux"

const IntroTile = ({tile}) => {
    // const dispatch = useDispatch()



    return (
        <div  className='introTile'>
            <div className='intro-img-div'>
                <img className='intro-img g-detail-img' id='intro-img' src={tile.url} alt='alt intro img 1' />
            </div>
            <div className='intro-text-div'>
                <p id='title-intro-tile' className='g-name-div'>
                    {tile.title}
                </p>
                <p id='text-intro-tile'>
                    {tile.text}
                </p>
            </div>
        </div>
    );
};

export default IntroTile;
