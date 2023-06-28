import React from 'react';
import "./Landing.css"
// import IntroTile from "./IntroTile"

// import { useDispatch } from "react-redux"
// import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoggedOut = () => {
    const user = useSelector(state => state.session.user)
    // const userGroupState = useSelector(state => state.groups.userGroups)

    // const userGroups = userGroupState

    if (user?.id) return null
    // if (!userGroupState?.id) return null

    return (

        <div className='Landing user-landing logged-out'>
            <div >
                Click on the top right icon to sign up and or login. Only registered users can join groups and events.
            </div>
            <div >
                Just browsing? You can still click on any group or event to view its details. Happy grouping!
            </div>
        </div>
    );
};

export default LoggedOut;