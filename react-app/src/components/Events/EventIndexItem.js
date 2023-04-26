import React from 'react';
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';
import { deleteEvent, joinEvent } from '../../store/event';


const EventIndexItem = ({ event, buttons }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        // console.log("group ID", group.id)
        history.push(`/event-details/${event.id}`)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        e.stopPropagation()
        history.push(`/forms/edit-event/${event.id}`)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(deleteEvent(event.id))
    }

    const handleJoin = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(joinEvent(event.id))
        history.push(`/event-details/${event.id}`)
    }

    return (
        <div onClick={handleClick} className='groupIndexItem'>

            <div className='group-card-div' >
                <div className='top'>
                    <div className='group-name-div'>
                        {event.name}
                    </div>
                    <div className='group-description-div'>
                        {event.description}
                    </div>
                </div>
                <div className='bottom-row'>
                    <div className='num-members-public-div'>
                        Date: {event.date} 
                    </div>
                    {buttons === true && 
                        <div className='buttons-div'>
                            <button onClick={handleUpdate} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button update-group-button' type='button' >Update</button>
                            <button onClick={handleDelete} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button delete-group-button' type='button' >Delete</button>
                            {/* <button onClick={handleDelete} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button' type='button' >Delete</button> */}
                        </div>
                    } 
                    <button onClick={handleJoin} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button delete-group-button' type='button' >Join Event</button>
                    <button onClick={handleDelete} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button delete-group-button' type='button' >Delete Event</button>
                </div>
                
            </div>

        </div>
    );
};

export default EventIndexItem;
