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
            <h1 className="groups-h1">
                Your Events
            </h1>
            <div className="groups-images">
                <div className="img-top-div img-only">
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/4edf5ea6d58c449a2aeb619a3fda9fff36a069dfbe4da8bc5d8ec1c758ddb8dc.png" alt="alt" />
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/6cfb48b5597b657c2eafb1277dc5eef4a07eae90c265fcd37ed798189619f0a5.png" alt="alt" />
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/037e3df083624e5480f8996821287479a375f62b470572a22773da0eaf9441d0.png" alt="alt" />
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/490d2f79f8547d6e364306af60c8184fb8024b8e55809e4cc501126109981a65.png" alt="alt" />
                    {/* <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/a66413200e934da19540afac965cfe8a2de4ada593d9a52d53108bb28e8bbc9c.png" alt="alt" /> */}
                </div>
                <div className="groupIndex">
                    {Object.values(events).map(event => (
                        <EventIndexItem title={event.name} event={event} key={event.id} buttons={true} />
                    ))}
                </div>
                <div className="img-top-div img-bottom-div">
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/71cabc939c577581f66b952f9c70891db779251e8e70f29de3c7bf494edacfe4.png" alt="alt" />
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/8dc2a024c9b7d95c7141b2ef065590dbc8d9018d12ad15f76b01923986702228.png" alt="alt" />
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/72e02e747b66b61fcbc02d35d350770b3ec7cbaabd0a7ca17c0d82743d43a7e8.png" alt="alt" />
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/48392820c6976ee1cd8dde13e71df85bf15560083ee5c8658fe7c298095d619a.png" alt="alt" />
                </div>
            </div>
        </div>
    )
}

