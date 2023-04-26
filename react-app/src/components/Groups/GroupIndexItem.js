import React from 'react';
import "./GroupIndexItem.css"


import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import GroupsIndex from './GroupsIndex';
import { deleteGroup, fetchGroups, joinGroup, leaveGroup } from '../../store/group';

const GroupIndexItem = ({ group, buttons }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const groupState = useSelector(state => state.groups.allGroups)


    const handleClick = (e) => {
        e.preventDefault()
        // console.log("group ID", group.id)
        history.push(`/group-details/${group.id}`)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        e.stopPropagation()
        history.push(`/forms/edit-group/${group.id}`)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(deleteGroup(group.id))
        // .then(dispatch(fetchGroups()))
    }

    const handleCreateEvent = (e) => {
        e.preventDefault()
        e.stopPropagation()
        history.push(`/forms/create-event/${group.id}`)
    }


    const handleJoin = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(joinGroup(group.id))
        history.push(`/group-details/${group.id}`)
    }

    const handleLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(leaveGroup(group.id))
        history.push(`/group-details/${group.id}`)
    }

    return (
        <div onClick={handleClick} className='groupIndexItem'>

            <div className='group-card-div' >
                <div className='top'>
                    <div className='group-name-div'>
                        {group.name}
                    </div>
                    <div className='group-description-div'>
                        {group.description}
                    </div>
                </div>
                <div className='bottom-row'>
                    <div className='num-members-public-div'>
                        {group.num_members} members 
                        {/* - {group.strangers === true ? "Public" : "Private"} */}
                    </div>
                    {buttons === true && 
                        <div className='buttons-div'>
                            <button onClick={handleUpdate} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button update-group-button' type='button' >Update</button>
                            <button onClick={handleCreateEvent} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button delete-group-button' type='button' >Create Event</button>
                            {/* <button onClick={handleCreateEvent} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button delete-group-button' type='button' >Create Event</button> */}
                            {/* <button onClick={handleDelete} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button' type='button' >Delete</button> */}
                        </div>
                    } 
                    <button onClick={handleJoin} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button delete-group-button' type='button' >Join Group</button>
                    <button onClick={handleLeave} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button delete-group-button' type='button' >Leave Group</button>
                    <button onClick={handleDelete} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button delete-group-button' type='button' >Delete Group</button>
                </div>
                
            </div>

        </div>
    );
};

export default GroupIndexItem;
