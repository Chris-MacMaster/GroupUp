import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import GroupIndexItem from "./GroupIndexItem";
import { fetchUserGroups } from "../../store/group";



export default function CurrentGroupsIndex() {
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

    if (!groups.length) {
        return null
    }

    return (
        <div className="groups-index">
            <h1 >
                Your Groups
            </h1>
            <div className="groupIndex">
                {Object.values(groups).map(group => (
                    <GroupIndexItem title={group.name} group={group} key={group.id} buttons={true} />
                ))}
            </div>
        </div>
    )
}

