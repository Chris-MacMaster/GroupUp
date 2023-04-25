import React from 'react';


const CurrentInterestItem = ({ interest, buttons }) => {
    // const dispatch = useDispatch(

    return (
        <div className='groupIndexItem'>
            <div className='group-card-div' >
                <div className='top'>
                    <div className='group-name-div'>
                        {interest.interest}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CurrentInterestItem;
