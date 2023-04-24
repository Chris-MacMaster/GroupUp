import React from 'react';
// import "./Landing.css"

// import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';

const UserDetails = () => {
    const history = useHistory()
    // const dispatch = useDispatch()



    return (
        <div className='Landing'>

            <div className='group-info-div' >
                <div className='group-info-title'>
                    <p >
                        UserDetails
                    </p>
                    {/* <p >
                        Meet new people who share your interests through online and in-person events.
                        It's free to create an account.
                    </p> */}
                </div>

            </div>
        </div>
    );
};

export default UserDetails;
