import React from 'react';
import "./Landing.css"
import IntroTile from "./IntroTile"

// import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserLanding = () => {
    const user = useSelector(state => state.session.user)
    // const userGroupState = useSelector(state => state.groups.userGroups)

    // const userGroups = userGroupState

    if (!user?.id) return null
    // if (!userGroupState?.id) return null

    return (

        <div className='Landing user-landing'>
            <div className='welcome-div'>
                Hello, {user.username} 👋
            </div>
            <div >
                First time logged in? Click on the top right icon to open the navigation menu and select "Create a Group" to get started. 
            </div>
            <div >
                Using the menu, click on your groups or your events in order to manage them.
            </div>
            {/* <div className='active-groups'>
                You are in {Object.values(userGroups.length)} groups
            </div>
            <div className='upcoming-events'>

            </div> */}
        </div>
    );
};

export default UserLanding;