import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import GroupIndexItem from "./GroupIndexItem";
// import { fetchUserGroups } from "../../store/group";
import { fetchUserEvents } from "../../store/event";
// import "./CurrentEvents"



export default function CurrentEventsMessage() {
    const dispatch = useDispatch()

    const eventState = useSelector(state => state.events.userEvents)
    const events = Object.values(eventState)

    // const [render, setRender] = useState(false)

    useEffect(() => {
        dispatch(fetchUserEvents())
    }, [dispatch])

    // useEffect(() => {
    //     if (groupState) {
    //         setRender(true)
    //     }
    // }, [groupState])

    // if (!groups.length) {
    //     return null
    // }

    return (

        <div className="groups-index">
            {!events.length &&
                <div className="groups-message">
                    Looks like you have no events right now, go to the landing and click "join event" on an event tile to add it to your events.
                </div>
            }
        </div>
    )
}

