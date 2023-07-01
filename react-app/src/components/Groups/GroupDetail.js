import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { fetchOneGroup } from '../../store/group';

import EventIndexItem from "../Events/EventIndexItem"
import UserIndexItem from '../UserDetails/UserIndexItem';

import './GroupDetail.css'





const GroupDetail = () => {
    const dispatch = useDispatch()
    // const history = useHistory()


    let { groupId } = useParams()


    useEffect(() => {
        dispatch(fetchOneGroup(groupId))
    }, [dispatch, groupId])

    const group = useSelector(state => state.groups.singleGroup)
    const groupEvents = group.Events

    if (!group.id) return null
    if (!groupEvents) return null

    // const eventsLength = group.Events.length
    // const usersLength = group.Users.length
    return (
        <div  className='group-detail-div'>
            <div className='g-detail-top-background'>
                "
            </div>
            <div className='g-detail-img-div'>
                <img className='g-detail-img g-img-icon' src='https://d15f34w2p8l1cc.cloudfront.net/overwatch/c3090e3a1dccc58f143ff53801bc0cecb139f0eb1278f157d0b5e29db9104bed.png' alt='alt' />
                <div className='g-info-div g-info-2'>
                    <div className='g-name-div'>
                        {group.name}
                    </div>
                    </div>
                </div>


                    <div className='g-subinfo-div'>
                        {Object.values(group.Users).length &&
                        <div className='g-num-members'>
                                {Object.values(group.Users).length} {Object.values(group.Users).length === 1 ? "member" : "members"}
                        </div>}
                        <div className='g-organizer'>
                            Organized by {group.organizer}
                        </div>
                    <div className='g-desc-div'>
                        <p className='upcoming-events g-description g-desc'>
                            Description
                        </p>
                        {group.description}
                    </div>
            </div>


            <div className='description-events-members-div'>


                <div className='g-description-div g-detail-events-div'>
                    <p className='upcoming-events g-detail-title-text up-events-text'>
                        UPCOMING EVENTS
                    </p>  
                </div>

                <div className='upcoming-events-index g-detail-events-div'>
                    {Object.values(group?.Events).length && Object.values(group?.Events).map(event => (
                        <EventIndexItem title={event.name} event={event} key={event.id} />
                    ))}
                </div>      

                <div className='g-detail-members-div'>
                    <p className='upcoming-events associated-users g-detail-title-text members-text'>
                        MEMBERS
                    </p>
                        
                    <div className='g-description-div'>
                        {Object.values(group.Users).length && Object.values(group?.Users).map(user => (
                            <UserIndexItem title={user.username} user={user} key={user.id} />
                        ))}
                    </div>              
                </div>

    


              
              
            </div>
        </div>
    );
};

export default GroupDetail;
