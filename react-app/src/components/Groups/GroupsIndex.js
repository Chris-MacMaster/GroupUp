import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { fetchProducts } from "../../store/product";
import GroupIndexItem from "./GroupIndexItem";
import { fetchGroups, fetchUserGroups } from "../../store/group";



function GroupsIndex() {
    const dispatch = useDispatch()

    const groupState = useSelector(state => state.groups.allGroups)
    const groups = Object.values(groupState)

    // const userGroupState = useSelector(state => state.groups.userGroups)
    // const userGroups = Object.values(userGroupState)

    // const userGroupState = useSelector(state => state.groups.userGroups)

    useEffect(() => {
        dispatch(fetchGroups())
        dispatch(fetchUserGroups())
    }, [dispatch])

    if (!groups.length) return null
    // if (!userGroups.length) return null



    return (
        <div className="groups-index">
            <h1 >
                All Groups
            </h1>
            <div className="groupIndex">
                {Object.values(groups).map(group => (
                    <GroupIndexItem title={group.name} group={group} key={group.id} buttons={false} />
                ))}
            </div>
        </div>
    )
}

export default GroupsIndex;
