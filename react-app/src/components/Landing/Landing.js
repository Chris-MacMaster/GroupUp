import React from 'react';
import "./Landing.css"
import  IntroTile  from "./IntroTile"

const Landing = () => {




    return (
        <div className='Landing'>

            <div className='group-info-div' >
                <div className='group-info-title'>
                    <p className='how-g-works'>
                        How Group Up Works
                    </p>
                    <div className='tiles-index'>
                        {Object.values(tiles).map(tile => (
                            <IntroTile tile={tile} key={tile.id} />
                        ))}
                    </div>
                    <p className='meet-text'>
                        Meet new people who share your interests through online and in-person events.
                         It's free to create an account.
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default Landing;


//placeholder landing content
const tiles = {
    1: {
        id: 1,
        url: `${process.env.PUBLIC_URL + "/ow-logo-gr-item.png"}`,
        title: "Group Up!",
        text: "Play what you want, find teammates who love it. The world could always use more heroes."
    },
    2: {
        id: 2,
        url: `${process.env.PUBLIC_URL + "/top-500.png"}`,
        title: "Find an Event",
        text: "Events are happening on all levels of play. From casual to competitive, beginner to veteran."
    },
    3: {
        id: 3,
        url: `${process.env.PUBLIC_URL + "/ow-player-icons.jpeg"}`,
        title: "Start a Group",
        text: "You don't have to be top 500 to gather teammates together and play."
    }
}
