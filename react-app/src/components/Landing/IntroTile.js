import React from 'react';
import "./IntroTile.css"


// import { useDispatch } from "react-redux"

const IntroTile = ({tile}) => {
    // const dispatch = useDispatch()



    return (
        <div  className='introTile'>
            <img className='intro-img g-detail-img' id='intro-img' src={tile.url} alt='alt intro img 1' />
            <p id='title-intro-tile' className='g-name-div'>
                {tile.title}
            </p>
            <p id='text-intro-tile'>
                {tile.text}
            </p>
        </div>
    );
};

export default IntroTile;
