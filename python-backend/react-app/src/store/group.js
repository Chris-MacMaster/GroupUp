// import { csrfFetch } from './csrf'
const LOAD_GROUPS = "groups/LOAD"
const LOAD_GROUP = "group/LOAD"
const POST_GROUP = "groups/POST"
const DELETE_GROUP = "groups/DELETE"
// const LOAD_USER_GROUPS = 'groups/LOAD_USER_GROUPS'

//**Actions */
export const actionLoadGroups = (groups) => {
    return {
        type: LOAD_GROUPS,
        payload: groups
    }
}

export const actionLoadGroup = (group) => {
    return {
        type: LOAD_GROUP,
        payload: group
    }
}

export const actionPostGroup = (group) => {
    return {
        type: POST_GROUP,
        payload: group
    }
}

export const actionDeleteGroup = (id) => {
    return {
        type: DELETE_GROUP,
        payload: id
    }
}


// export const userProducts = products => ({
//     type: LOAD_USER_PRODUCTS,
//     payload: products
// })



//**Thunks */

//FOR TESTING ONLY!!! SCRAP WHEN DB SEEDS
const groups = [{
    id: 1,
    name: 'Tank Lovers',
    description: 'More people play our role please.',
    imgUrl: 'tank_url@tanks.com/tank.png',
    organizer: "Demo",
    num_members: 1,
},
{
    id: 2,
    name: 'Doctors that No One Guards',
    description: 'They always need healing.',
    imgUrl: 'healer_url@supports.com/medic.png',
    organizer: "marnie",
    num_members: 2,

},
{
    id: 3,
    name: 'Just Heal Us',
    description: 'I dont know how to swap or peel.',
    img_url: 'dpsl@throwers.com/damage.png',
    organizer: "marnie",
    num_members: 3,
}
]


//PRODUCTS HOME PAGE
export const fetchGroups = () => async dispatch => {
    const response = await fetch('/api/groups/')

    if (response.ok) {
        const groups = await response.json()
        dispatch(actionLoadGroups(groups))
        return groups
    }
}

export const fetchOneGroup = (id) => async dispatch => {
    //**Code For Backend */
    // const response = await fetch(`/api/groups/${id}/`)
    // if (response.ok) {
    //     const group = await response.json()
    //     dispatch(actionLoadGroup(group))
    //     return group
    // }

    //FOR TESTING ONLY!
    return groups[id-1]

}

// export const fetchUserGroups = () => async dispatch => {
//     const response = await fetch(`/api/groups/current/`)

//     if (response.ok) {
//         const groups = await response.json()
//          return dispatch(loaduserGroups(groups))
//     }
// }

export const makeGroup = (groupBody) => async dispatch => {
    const { name, description, img_url, organizer, num_members } = groupBody
    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({
        name,
        description,
        img_url,
        organizer,
        num_members,
    })
    const options = { method, headers, body }
    const response = await fetch('/api/groups/', options)
    
    if (response.ok) {
        const product = await response.json()
        return product
    }
}

export const editGroup = (groupBody, groupId) => async dispatch => {
    const { name, description, img_url, organizer, num_members } = groupBody
    const method = "PUT"
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({
        name,
        description,
        img_url,
        organizer,
        num_members,
    })
    const options = { method, headers, body }
    const response = await fetch(`/api/groups/${groupId}/`, options)
    //testing
    if (response.ok) {
        const product = await response.json()
        return product
    }

}

export const deleteGroup = (id) => async dispatch => {
    const method = "DELETE"
    const headers = { "Content-Type": "application/json" }
    const options = { method, headers }
    const response = await fetch(`/api/groups/${id}/`, options)
    
    if (response.ok) {
        const deleteData = await response.json()
        dispatch(actionDeleteGroup(id))
        return deleteData
    }

}

const initialState = {
    allGroups: {},
    singleGroup: {},
    userGroups: {},
}

//**Reducer and Cases */
export default function groupReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_GROUPS: {
            const newState = { ...state }
            newState.allGroups = action.payload
            // resets group details when going to allProducts page
            newState.singleGroup = {}
            return newState
        }
        case LOAD_GROUP: {
            let newState = { ...state, singleGroup: { ...state.singleGroup } }
            newState.singleGroup = { ...action.payload }
            return newState
        }
        // case LOAD_USER_PRODUCTS: {
        //     const newState = { ...state }
        //     // console.log("FDASFDSAFAD", action.payload)
        //     newState.userProducts = { ...action.payload }
        //     return newState
        // }
        case POST_GROUP: {
            const newState = { ...state }
            newState.allGroups[action.payload.id] = action.payload
            return newState
        }

        case DELETE_GROUP: {
            const newState = { ...state }
            delete newState.allGroups[action.payload]
            return newState
        }
        default: return state
    }
}
