import React from 'react';
import "./Landing.css"
import "./GroupUp.css"

const GroupUp = ( {subtitle} ) => {

    return (
        <div className='user-landing-wrapper'>
            <div className='Landing user-landing gr-up-div'>
                
                    <div className='group-up-div-a'>
                        GRO
                    </div>
                    {/* <div className='gr-img-div'>
                        <img className='gr-up-img' src='https://img0.etsystatic.com/163/0/13555616/il_570xN.1112156364_cruz.jpg' alt='alt' />
                    </div> */}
                    <div className='group-up-div-a group-up-div-b'>
                        UP UP
                    </div>
                
            </div>
            {!subtitle &&
                <div className='landing-background-img-div'>
        
                    <video className='user-background-img user-vod' src={process.env.PUBLIC_URL + "/Xbox_Trailer_03.mp4"} autoPlay loop width="400" height="300" muted />
                    <div className='vod-text-content'> 
                    
                        <img className='gr-up-img vod-ow-img' src='https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/bltbcf2689c29fa39eb/622906a991f4232f0085d3cc/Masthead_Overwatch2_Logo.png?format=webply&quality=90' alt='alt' />
                      
                    
                    </div>
                    <div className='under-vod-spacing'> </div>
                </div>
            }

            {subtitle &&
            <div className='subtitle'>
                {/* {subtitle} */}
                {/* <img className='user-background-img gr-background-img' src='https://bnetcmsus-a.akamaihd.net/cms/blog_header/a5/A54ZNOI0UDS41686104831926.png' alt='alt' /> */}
            </div>
                }
        </div>

        
    );
};

export default GroupUp;