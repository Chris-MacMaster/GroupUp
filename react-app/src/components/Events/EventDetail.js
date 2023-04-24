import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { fetchOneEvent } from '../../store/event';


const EventDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()


    let { eventId } = useParams()


    useEffect(() => {
        dispatch(fetchOneEvent(eventId))
    }, [dispatch, eventId])

    const event = useSelector(state => state.events.singleEvent)


    if (!event.id) {
        return null
    }



    return (
        <div className='group-detail-div'>
            <div title={event.name} className='group-name-div' >
                Name: {event.name}
            </div>

            <div title={event.description} className='group-description-div' >
                Description: {event.description}
            </div>

            <div title={event.host} className='group-organizer-div' >
                Host: {event.host}
            </div>
        </div>
    );
};

export default EventDetail;
