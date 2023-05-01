import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { fetchOneEvent } from '../../store/event';
import UserIndexItem from '../UserDetails/UserIndexItem';
import './EventDetail.css'


const EventDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    let { eventId } = useParams()

    useEffect(() => {
        dispatch(fetchOneEvent(eventId))
    }, [dispatch, eventId])

    const event = useSelector(state => state.events.singleEvent)
    const eventGroup = event.Group

    if (!event.id) return null
    if (!eventGroup) return null
    
    return (
        <div className='group-detail-div g-detail-div'>
            <div className='g-detail-img-div g-name-div e-top-div'>
                <div className='e-header-info g-num-members'>
                    {/* <div className='e-name e-title'>
                       Event Details
                    </div> */}
                    <div className='e-name'>
                        {event.name}
                    </div>
                    <div>
                        <div className='g-subinfo-div e-hosted-div'>
                            Hosted by {event.host}
                        </div>
                    </div>
                </div>
                <div className='img-e-info-div'>
                    <img className='g-detail-img e-detail-img' src='https://cutewallpaper.org/24x/ybdxp5ckz/1808411912.jpg' alt='alt' />
                    <div className='g-info-div'>
                        <div className='g-subinfo-div e-subinfo-div'>
                            <div className='g-num-members format-title'>
                                Group: {event.Group.name}
                            </div>
                            {/* <div className='g-organizer e-format-div'>
                                {event.Group.num_members} {event.Group.num_members === 1 ? "member" : "members"}
                            </div> */}

                            <div className='g-organizer'>
                                <div className='format-title g-organizer'>
                                    Date
                                </div>
                                <div className='e-format-div'>
                                    {event.date}
                                </div>
                            </div>

                            <div className='g-organizer'>
                                <div className='format-title g-organizer'>
                                    Format 
                                </div>
                                <div className='e-format-div'>
                                    {event.format}
                                </div>
                                <div className='e-format-div'>
                                    {event.strangers === 'true' ? "public" : "private"} event
                                </div>
                            </div>


                            <div className='g-organizer'>
                                <div className='format-title g-organizer'>
                                    Permissions
                                </div>
                                <div className='e-format-div'>
                                    {event.strangers === 'true' ? "Public" : "Private"} event - {event.online === 'true' ? "Online" : "In Person"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='description-events-members-div'>
                <div className='g-description-div'>
                    <p className='upcoming-events g-description'>
                        Details
                    </p>
                    {event.details}
                </div>

                <div className='g-description-div'>
                    <p className='upcoming-events associated-users'>
                        Attendees ({Object.values(event.Users).length && Object.values(event.Users).length})
                    </p>
                    {Object.values(event.Users).length && Object.values(event.Users).map(user => (
                        <UserIndexItem title={user.username} user={user} key={user.id} />
                    ))}
                </div>



            </div>
        </div>
    );
};

export default EventDetail;
