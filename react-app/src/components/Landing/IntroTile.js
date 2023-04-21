import React from 'react';


// import { useDispatch } from "react-redux"

const IntroTile = (tile) => {
    // const dispatch = useDispatch()
    const tileShape = {
        id : "id",
        url :"url",
        title: "title",
        text: "text"
    }


    return (
        <div  className='introTile'>
            <img className='intro-img' id='intro-img' src={tile.url} alt='alt intro img 1' />
            <p >
                {tile.title}
            </p>
            <p >
                
            </p>
        </div>
    );
};

export default IntroTile;
