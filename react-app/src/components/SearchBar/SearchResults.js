import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import GroupIndexItem from '../Groups/GroupIndexItem';
import EventIndexItem from '../Events/EventIndexItem';
import SearchGroupIndexItem from './SearchGroupIndexItem';
import './SearchResults.css'





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
        <div className='groups-index search-component'>
            <div className='g-detail-top-background search-top'>
                "
            </div>
            
            {/* <h1 className="groups-h1 search-groups-h1">
                Groups
            </h1> */}
            <div className="groupIndex search-groups-div">
                {Object.values(groups).filter(group => group.name.toLowerCase().includes(parameters.toLowerCase())).map(group => (
                    <SearchGroupIndexItem title={group.name} group={group} key={group.id} buttons={false} />
                ))}
            </div>

            {/* <h1 className="groups-h1 search-events-h1">
                Events
            </h1> */}
            <div className="groupIndex search-events-div">
                {Object.values(events).filter(event => event.name.toLowerCase().includes(parameters.toLowerCase())).map(event => (
                    <EventIndexItem title={event.name} event={event} key={event.id} buttons={false} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
