import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import GroupIndexItem from '../Groups/GroupIndexItem';
import EventIndexItem from '../Events/EventIndexItem';





const SearchResults = () => {
    // const dispatch = useDispatch(
    const { parameters } = useParams()


    const groupState = useSelector(state => state.searchResults.allGroups)
    const groups = Object.values(groupState)


    const eventState = useSelector(state => state.searchResults.allEvents)
    const events = Object.values(eventState)

    useEffect(() => {
        console.log(parameters)
    }, [parameters])

    if (!groups.length) return null
    if (!events.length) return null


    return (
        <div className='groups-index'>
            <div className="groupIndex">
                {Object.values(groups).filter(group => group.name.toLowerCase().includes(parameters.toLowerCase())).map(group => (
                    <GroupIndexItem className="group-index-item" title={group.name} group={group} key={group.id} buttons={false} />
                ))}
            </div>

            <div className="groupIndex">
                {Object.values(events).filter(event => event.name.toLowerCase().includes(parameters.toLowerCase())).map(event => (
                    <EventIndexItem title={event.name} event={event} key={event.id} buttons={false} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
