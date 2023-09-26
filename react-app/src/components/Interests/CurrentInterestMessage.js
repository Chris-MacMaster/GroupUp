import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import GroupIndexItem from "./GroupIndexItem";
import { fetchInterests } from "../../store/interest";
// import "./CurrentGroupsMessage.css"



export default function CurrentInterestMessage() {
    const dispatch = useDispatch()

    const interestState = useSelector(state => state.interests.allInterests)
    const interests = Object.values(interestState)

    useEffect(() => {
        dispatch(fetchInterests())
    }, [dispatch])

    if (!interests.length) {
        return null
    }

    return (

        <div className="groups-index">
            {!interests.length &&
                <div className="groups-message">
                    Looks like you have no interests right now, ().
                </div>
            }
        </div>
    )
}

