import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchInterests } from "../../store/interest";
import CurrentInterestItem from "./CurrentInterestItem";



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
        <div className="groups-index">
            <h1 >
                Your Interests (search/suggested groups functionality coming soon!)
            </h1>
            <div className="groupIndex">
                {Object.values(interests).map(interest => (
                    <CurrentInterestItem interest={interest} key={interest.id} />
                ))}
            </div>
        </div>
    )
}

