import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { fetchProducts } from "../../store/product";
import EventIndexItem from "./EventIndexItem";
import { fetchEvents } from "../../store/event";



export default function EventsIndex() {
    const dispatch = useDispatch()

    const eventState = useSelector(state => state.events.allEvents)
    const events = Object.values(eventState)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])

    if (!events.length) {
        return null
    }

    return (
        <div className="groups-index">
            <h1 >
                All Events
            </h1>
            <div className="groupIndex">
                {Object.values(events).map(event => (
                    <EventIndexItem title={event.name} event={event} key={event.id} buttons={false} />
                ))}
            </div>
        </div>
    )
}
