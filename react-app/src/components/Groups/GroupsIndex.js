import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { fetchProducts } from "../../store/product";
import GroupIndexItem from "./GroupIndexItem";



function GroupsIndex() {
    const dispatch = useDispatch()

    //COMMENTED OUT FOR TESTING
    // const groupState = useSelector(state => state.groups.allGroups)
    // const groups = Object.values(groupState)
    const groups = [{
        id:1,
        name:'Tank Lovers',
        description:'More people play our role please.',
        imgUrl:'tank_url@tanks.com/tank.png',
        organizer:"Demo",
        num_members:1,},
        {
        id:2,
        name:'Doctors that No One Guards',
        description:'They always need healing.',
        imgUrl:'healer_url@supports.com/medic.png',
        organizer:"marnie",
        num_members:2,

        },
        {
        id:3,
        name:'Just Heal Us',
        description:'I dont know how to swap or peel.',
        img_url:'dpsl@throwers.com/damage.png',
        organizer:"marnie",
        num_members:3, 
        }
     ]

    useEffect(() => {
        // dispatch(fetchProducts())
    }, [dispatch])

    if (!groups.length) {
        return null
    }

    return (
        <div className="groups-index">
            <div className="groupIndex">
                {Object.values(groups).map(group => (
                    <GroupIndexItem title={group.name} group={group} key={group.id} />
                ))}
            </div>
        </div>
    )
}

export default GroupsIndex;
