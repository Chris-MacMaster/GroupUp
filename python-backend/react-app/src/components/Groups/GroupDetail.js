import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { fetchOneGroup } from '../../store/group';


const GroupDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()


    let { groupId } = useParams()


    useEffect(() => {
        dispatch(fetchOneGroup(groupId))
    }, [dispatch, groupId])

    const group = useSelector(state => state.groups.singleGroup)


    if (!group.id) {
        return null
    }



    return (
        <div  className='group-detail-div'>
            <div title={group.name} className='group-name-div' >
                Name: {group.name}
            </div>

            <div title={group.description} className='group-description-div' >
                Description: {group.description}
            </div>

            <div title={group.organizer} className='group-organizer-div' >
                Organizer: {group.organizer}
            </div>
        </div>
    );
};

export default GroupDetail;
