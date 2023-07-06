import React, { useState } from 'react';
import "./SearchGroupIndexItem.css"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { deleteGroup, joinGroup, leaveGroup } from '../../store/group';

const SearchGroupIndexItem = ({ group, buttons }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [showButton, setShowButton] = useState(true)

    const user = useSelector(state => state.session.user)

    const handleClick = (e) => {
        e.preventDefault()
        history.push(`/group-details/${group.id}`)
    }

    const handleUpdate = (e) => {
        e.stopPropagation()
        history.push(`/forms/edit-group/${group.id}`)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(deleteGroup(group.id))
    }

    const handleCreateEvent = (e) => {
        e.preventDefault()
        e.stopPropagation()
        history.push(`/forms/create-event/${group.id}`)
    }


    const handleJoin = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(joinGroup(group.id))
        setShowButton(false)
    }


    const handleLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(leaveGroup(group.id))
        // history.push(`/`)
    }


    return (
        <div>

            <div onClick={handleClick} className='group-card-div search-group-card-div' >
                <div className='top'>
                    <div className='name-description-organizer'>
                        <div className='group-name-div'>
                            {group.name}
                        </div>
                        <div className='group-description-div'>
                            {group.description}
                        </div>
                        <div className='group-description-div group-organizer-div'>
                            {user?.username === group.organizer && "*You are Organizer"}
                        </div>
                    </div>
                    <div className='img-group-div'>
                        <img className='img-card' src='https://w7.pngwing.com/pngs/1/769/png-transparent-stick-people-high-five-teamwork-people-friendship-together-success-celebration-celebrating.png' alt='alt' />
                    </div>

                </div>
                <div className='bottom-row'>
                    <div className='num-members-public-div'>
                        Organizer: {group.organizer}
                        {/* - {group.strangers === true ? "Public" : "Private"} */}
                    </div>
                    {buttons === true &&
                        <div className='buttons-div'>
                            <button onClick={handleUpdate} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button update-group-button' type='button' >Update</button>
                            <button onClick={handleCreateEvent} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button delete-group-button create-event-button' type='button' >Create Event</button>
                            {user?.username === group.organizer && <button onClick={handleDelete} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button delete-group-button delete-gr-button' type='button' >Delete Group</button>}
                            <button onClick={handleLeave} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button delete-group-button' type='button' >Leave Group</button>
                        </div>
                    }
                    {showButton && user?.id && buttons !== true && <button id='join-gr-button' onClick={handleJoin} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button delete-group-button' type='button' >Join Group</button>}
                </div>
            </div>

            <div className='group-card-img'>
            </div>

        </div>
    );
};

export default SearchGroupIndexItem;
