import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { fetchOneEvent } from '../../store/event';
import UserIndexItem from '../UserDetails/UserIndexItem';
import './EventDetail.css'


const EventDetail = () => {
    const dispatch = useDispatch()
    // const history = useHistory()

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
            <div className='g-detail-top-background'>
                "
            </div>
            <div className='g-detail-img-div g-name-div e-top-div'>
                <img className='g-detail-img g-img-icon' src='https://d15f34w2p8l1cc.cloudfront.net/overwatch/c3090e3a1dccc58f143ff53801bc0cecb139f0eb1278f157d0b5e29db9104bed.png' alt='alt' />
                <div className='e-header-info g-num-members'>
                    <div className='e-name g-info-2'>
                        {event.name}
                    </div>
                </div>
            </div>
            <div className='g-subinfo-div e-hosted-div'>
                Hosted by {event.host}
            </div>
            <div className='g-description-div e-details-div'>
                {event.details}
            </div>
            <div className='g-description-div g-detail-events-div'>
                <p className='upcoming-events g-detail-title-text up-events-text'>
                    GROUP
                </p>
            </div>
            
            
                <div className='img-e-info-div'>
                    
                    <div className='g-info-div e-group-div'>
                        <div className='e-detail-g-div'>
                            <div className='g-num-members format-title'>
                                {event.Group.name}
                            </div>
                            {/* <div className='g-organizer e-format-div'>
                                {event.Group.num_members} {event.Group.num_members === 1 ? "member" : "members"}
                            </div> */}

                            <div className='g-organizer'>
                                <div className='e-format-div'>
                                    {event.date}
                                </div>
                            </div>

                            <div className='g-organizer'>
                            </div>

                            <div className='g-organizer'>
                                <div className='e-format-div'>
                                    {event.strangers === 'true' ? "Public" : "Private"} event - {event.online === 'true' ? "Online" : "In Person"}
                                </div>
                            </div>
                            <div className='format-title g-organizer'>
                                Format 
                            </div>
                            <div className='e-format-div'>
                                {event.format}
                            </div>
                        </div>
                    </div>
                </div>


            <div className='description-events-members-div'>

                <div className='g-description-div e-attendees-div'>
                    <p className='upcoming-events associated-users'>
                        ATTENDEES ({Object.values(event.Users).length && Object.values(event.Users).length})
                    </p>
                </div>
                <div className='upcoming-events-index e-detail-events-div'>
                    {Object.values(event.Users).length && Object.values(event.Users).map(user => (
                        <UserIndexItem title={user.username} user={user} key={user.id} />
                    ))}

                </div>



            </div>
            <div className='e-detail-bottom-background'>
                "
            </div>
        </div>
    );
};

export default EventDetail;


