import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import GroupIndexItem from "./GroupIndexItem";
import { fetchUserGroups } from "../../store/group";
import "./CurrentGroupsMessage.css"



export default function CurrentGroupsMesage() {
    const dispatch = useDispatch()

    const groupState = useSelector(state => state.groups.userGroups)
    const groups = Object.values(groupState)

    // const [render, setRender] = useState(false)

    useEffect(() => {
        dispatch(fetchUserGroups())
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
            {!groups.length &&
                <div className="groups-message">
                    Looks like you have no groups right now, go to the landing and click "join group" on a group tile to add it to your groups.
                </div>
            }
        </div>
    )
}

