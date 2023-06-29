import React from 'react';
import "./Landing.css"
import IntroTile from "./IntroTile"

const OwLanding = () => {

    return (
        <div className='Landing'>
            <div className='group-info-div' >
                <div className='group-info-title'>
                    <p className='how-g-works'>
                        NOW LIVE
                    </p>
                    <p className='how-g-works'>
                        STAND WITH YOUR FELLOW HEROES
                    </p>
                    <p className='how-g-works'>
                        Grab your friends, group up, and dive into everything Overwatch 2 has in store.
                    </p>
                    <div className='tiles-index'>
                        {Object.values(owTiles).map(tile => (
                            <IntroTile tile={tile} key={tile.id} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OwLanding;


//placeholder landing content

const owTiles = {
    1: {
        id: 1,
        url: "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt7ae965a8123f27df/632128d5a0ff920e11e7925c/F2P.jpg?format=webply&quality=90",
        title: "FREE-TO-PLAY",
        text: "Overwatch 2 is a free-to-play, always-on, and ever-evolving live game. Team up with friends regardless of platform and jump into the reimagined PvP experience."
    },
    2: {
        id: 2,
        url: "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt952acdccb572a7f0/632128d5be2fcf0db5eea556/Heroes.jpg?format=webply&quality=90",
        title: "ALL-NEW HEROES",
        text: "More extraordinary heroes will join the current roster. Whether you like to lead the charge, ambush enemies, or aid your allies, theres a new hero for you."
    },
    3: {
        id: 3,
        url: "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt038029114fe902a4/632128d5e7bdcf0dd996c989/Action.jpg?format=webply&quality=90",
        title: "AWARD-WINNING ACTION",
        text: "Enjoy high-octane conflict with a fresh lineup of heroes, more maps to explore, and 5v5 combat that gives every player game-changing power."
    },
    4: {
        id: 4,
        url: "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt395c88698303c634/632128d51566e20e82f3030a/Crossplay.jpg?format=webply&quality=90",
        title: "CROSS-PLAY AND PROGRESSION",
        text: "Play across multiple platforms and devices and access your unlocks, progress, and accolades anywhere, any time."
    }
}