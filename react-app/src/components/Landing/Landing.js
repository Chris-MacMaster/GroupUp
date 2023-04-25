import React from 'react';
import "./Landing.css"
import  IntroTile  from "./IntroTile"

// import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';

const Landing = () => {
    const history = useHistory()
    // const dispatch = useDispatch()

   

    return (
        <div className='Landing'>

            <div className='group-info-div' >
                <div className='group-info-title'>
                    <p className='how-g-works'>
                        How Groupup works
                    </p>
                    <div className='tiles-index'>
                        {Object.values(tiles).map(tile => (
                            <IntroTile tile={tile} key={tile.id} />
                        ))}
                    </div>
                    <p >
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
        url: "https://w7.pngwing.com/pngs/1/769/png-transparent-stick-people-high-five-teamwork-people-friendship-together-success-celebration-celebrating.png",
        title: "Group Up!",
        text: "Play what you want, find teammates who love it. The world could always use more heroes."
    },
    2: {
        id: 2,
        url: "https://cutewallpaper.org/24x/ybdxp5ckz/1808411912.jpg",
        title: "Find an Event",
        text: "Events are happening on all levels of play. From casual to competitive, beginner to veteran."
    },
    3: {
        id: 3,
        url: "https://www.shutterstock.com/image-vector/people-vector-icon-600w-378571234.jpg",
        title: "Start a Group",
        text: "You don't have to be top 500 to gather teammates together and play."
    }
}