import React from 'react';
import "./GroupIndexItem.css"

// import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';

const GroupIndexItem = ({ group }) => {
    const history = useHistory()
    // const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        // console.log("group ID", group.id)
        history.push(`/group-details/${group.id}`)
    }

    return (
        <div onClick={handleClick} className='groupIndexItem'>

            <div title={group.name} className='group-card-div' >
                {group.name}
            </div>
        </div>
    );
};

export default GroupIndexItem;
