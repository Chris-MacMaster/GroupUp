import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { fetchOneGroup } from '../../store/group';

import EventIndexItem from "../Events/EventIndexItem"
import UserIndexItem from '../UserDetails/UserIndexItem';

import './GroupDetail.css'


const GroupDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()


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
            <div className='g-detail-img-div'>
                <img className='g-detail-img' src='https://w7.pngwing.com/pngs/1/769/png-transparent-stick-people-high-five-teamwork-people-friendship-together-success-celebration-celebrating.png' alt='alt' />
                <div className='g-info-div e-subinfo-div g-info-2'>
                    <div className='g-name-div'>
                        {group.name}
                    </div>
                    <div className='g-subinfo-div'>
                        {Object.values(group.Users).length &&


                        <div className='g-num-members'>
                                {Object.values(group.Users).length} {Object.values(group.Users).length === 1 ? "member" : "members"}
                        </div>}
                        <div className='g-organizer'>
                            Organized by {group.organizer}
                        </div>

                    </div>
                    <div className='g-desc-div'>
                        <p className='upcoming-events g-description g-desc'>
                            Description
                        </p>
                        {group.description}
                    </div>
                </div>
            </div>


            <div className='description-events-members-div'>


                <div className='g-description-div'>
                    <p className='upcoming-events'>
                        Upcoming Events
                    </p>        
                    {Object.values(group?.Events).length && Object.values(group?.Events).map(event => (
                        <EventIndexItem title={event.name} event={event} key={event.id} />
                    ))}
                </div>

                <div className='g-description-div'>
                    <p className='upcoming-events associated-users'>
                       Members
                    </p>
                    {Object.values(group.Users).length && Object.values(group?.Users).map(user => (
                        <UserIndexItem title={user.username} user={user} key={user.id} />
                    ))}
                </div>

              
              
            </div>
        </div>
    );
};

export default GroupDetail;
