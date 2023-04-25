import React from 'react';
import './UserIndexItem.css'

const UserIndexItem = ({user}) => {
    return (
        <div  className='groupIndexItem userIndexItem'>

            <div className='group-card-div user-card-div'>
                <div className='user-card-name'>
                    {user.username}
                </div>
            </div>

        </div>
    );
};

export default UserIndexItem;
