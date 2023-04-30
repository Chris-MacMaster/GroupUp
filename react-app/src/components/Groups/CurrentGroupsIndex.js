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
            <h1 className="groups-h1">
                Your Groups
            </h1>
            <div className="groups-images">
                <div className="img-top-div img-only">
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/3429c394716364bbef802180e9763d04812757c205e1b4568bc321772096ed86.png" alt="alt" />
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/bd9c8e634d89488459dfc1aeb21b602fa5c39aa05601a4167682f3a3fed4e0ee.png" alt="alt" />
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/a66413200e934da19540afac965cfe8a2de4ada593d9a52d53108bb28e8bbc9c.png" alt="alt" />
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/2508ddd39a178d5f6ae993ab43eeb3e7961e5a54a9507e6ae347381193f28943.png" alt="alt" />
                    {/* <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/a66413200e934da19540afac965cfe8a2de4ada593d9a52d53108bb28e8bbc9c.png" alt="alt" /> */}
                </div>
                <div className="groupIndex">
                    {Object.values(groups).map(group => (
                        <GroupIndexItem title={group.name} group={group} key={group.id} buttons={true} />
                    ))}
                </div>
                <div className="img-top-div img-bottom-div">
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/a714f1cb33cc91c6b5b3e89ffe7e325b99e7c89cc8e8feced594f81305147efe.png" alt="alt" />
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/2edb9af69d987bb503cd31f7013ae693640e692b321a73d175957b9e64394f40.png" alt="alt" />
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/bca8532688f01b071806063b9472f1c0f9fc9c7948e6b59e210006e69cec9022.png" alt="alt" />
                    <img className="hero-img" src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/000beeb5606e01497897fa9210dd3b1e78e1159ebfd8afdc9e989047d7d3d08f.png" alt="alt" />
                </div>
            </div>
        </div>
    )
}

