import React from 'react';
import "./Landing.css"
import "./GroupUp.css"

const GroupUp = ( {subtitle} ) => {
    // const user = useSelector(state => state.session.user)
    // // const userGroupState = useSelector(state => state.groups.userGroups)

    // // const userGroups = userGroupState

    // if (!user?.id) return null
    // // if (!userGroupState?.id) return null

    return (
        <div className='user-landing-wrapper'>
            <div className='Landing user-landing gr-up-div'>
                {/* <div className='gr--u'> */}
                    <div className='group-up-div-a'>
                        GR
                    </div>
                    <div className='gr-img-div'>
                        <img className='gr-up-img' src='https://img0.etsystatic.com/163/0/13555616/il_570xN.1112156364_cruz.jpg' alt='alt' />
                    </div>
                    <div className='group-up-div-a group-up-div-b'>
                        UP UP
                    </div>
                {/* </div> */}
            </div>
            {subtitle &&
            <div className='subtitle'>
                {subtitle}
            </div>
                }
        </div>

        
    );
};

export default GroupUp;