import React from 'react';
import "./CurrentInterestItem.css"


const CurrentInterestItem = ({ interest, buttons }) => {
    // const dispatch = useDispatch(

    return (
        <div className='userIndexItem'>
            <div className='user-card-div' >
                <div className='user-card-name interest-name'>
                    {interest.interest}
                </div>
            </div>
        </div>
    );
};

export default CurrentInterestItem;
