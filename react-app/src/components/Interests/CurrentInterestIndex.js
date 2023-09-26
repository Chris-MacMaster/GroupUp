import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchInterests } from "../../store/interest";
import CurrentInterestItem from "./CurrentInterestItem";
import "./CurrentInterestIndex.css"



export default function CurrentInterestIndex() {
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
        <div className="groups-index interests-index">
            <h1 className="groups-h1 interests-h1">
                Your Interests
            </h1>
            <div className="groupIndex sub-interests-index">
                {Object.values(interests).map(interest => (
                    <CurrentInterestItem interest={interest} key={interest.id} />
                ))}
            </div>
        </div>
    )
}

