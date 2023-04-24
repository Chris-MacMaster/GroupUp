import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import EventIndexItem from "./EventIndexItem";
import { fetchUserEvents } from "../../store/event";



export default function CurrentEventsIndex() {
    const dispatch = useDispatch()

    const eventState = useSelector(state => state.events.userEvents)
    const events = Object.values(eventState)

    useEffect(() => {
        dispatch(fetchUserEvents())
    }, [dispatch])

    if (!events.length) {
        return null
    }

    return (
        <div className="groups-index">
            <h1 >
                Your Events
            </h1>
            <div className="groupIndex">
                {Object.values(events).map(event => (
                    <EventIndexItem title={event.name} event={event} key={event.id} buttons={true} />
                ))}
            </div>
        </div>
    )
}

