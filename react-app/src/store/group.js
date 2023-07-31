const LOAD_GROUPS = "groups/LOAD"
const LOAD_USER_GROUPS = "groups/USERS/LOAD"
const LOAD_GROUP = "group/LOAD"
const POST_GROUP = "groups/POST"
const DELETE_GROUP = "groups/DELETE"
const LEAVE_GROUP = "groups/LEAVE"

//**Actions */
export const actionLoadGroups = (groups) => {
    return {
        type: LOAD_GROUPS,
        payload: groups
    }
}

export const actionLoadUserGroups = (groups) => {
    return {
        type: LOAD_USER_GROUPS,
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

export const actionLeaveGroup = (id) => {
    return {
        type: LEAVE_GROUP,
        payload: id
    }
}



//**Thunks */


//PRODUCTS HOME PAGE
export const fetchGroups = () => async dispatch => {
    const response = await fetch('/api/all-groups/')

    if (response.ok) {
        const groups = await response.json()
        dispatch(actionLoadGroups(groups))
        return groups
    }
}


export const fetchUserGroups = () => async dispatch => {
    const response = await fetch(`/api/all-groups/current/user-groups`)

    if (response.ok) {
        const groups = await response.json()
        return dispatch(actionLoadUserGroups(groups))
    }
}


export const fetchOneGroup = (id) => async dispatch => {
    const response = await fetch(`/api/all-groups/${id}/`)
    if (response.ok) {
        const group = await response.json()
        dispatch(actionLoadGroup(group))
        return group
    }

}


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
    const response = await fetch('/api/all-groups/', options)
    
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
    const response = await fetch(`/api/all-groups/${groupId}/`, options)
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
    const response = await fetch(`/api/all-groups/${id}/`, options)
    
    if (response.ok) {
        const deleteData = await response.json()
        dispatch(actionDeleteGroup(id))
        return deleteData
    }

}

export const joinGroup = (id) => async dispatch => {
    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const options = { method, headers }

    const response = await fetch(`/api/all-groups/current/user-groups/join/${id}/`, options)
    if (response.ok) {
        const group = await response.json()
        dispatch(actionLoadGroup(group))
        return group
    }
}


export const leaveGroup = (id) => async dispatch => {
    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const options = { method, headers }

    const response = await fetch(`/api/all-groups/current/user-groups/remove/${id}/`, options)
    if (response.ok) {
        const group = await response.json()
        dispatch(actionLeaveGroup(id))
        return group
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
            const newState = { allGroups: { ...state.allGroups }, singleGroup: { ...state.singleGroup }, userGroups: { ...state.userGroups } }
            newState.allGroups = action.payload
            newState.singleGroup = {}
            return newState
        }

        case LOAD_USER_GROUPS: {
            const newState = { allGroups: { ...state.allGroups }, singleGroup: { ...state.singleGroup }, userGroups: { ...state.userGroups } }
            newState.userGroups = action.payload
            return newState
        }
        case LOAD_GROUP: {
            const newState = { allGroups: { ...state.allGroups }, singleGroup: { ...state.singleGroup }, userGroups: { ...state.userGroups } }
            newState.singleGroup = { ...action.payload }
            return newState
        }

        case POST_GROUP: {
            const newState = { allGroups: { ...state.allGroups }, singleGroup: { ...state.singleGroup }, userGroups: { ...state.userGroups } }
            newState.allGroups[action.payload.id] = action.payload
            return newState
        }

        case DELETE_GROUP: {
            const newState = { allGroups: { ...state.allGroups }, singleGroup: { ...state.singleGroup }, userGroups: { ...state.userGroups } }
            delete newState.userGroups[action.payload]
            return newState
        }

        case LEAVE_GROUP: {
            const newState = { allGroups: { ...state.allGroups }, singleGroup: { ...state.singleGroup }, userGroups: { ...state.userGroups } }
            delete newState.userGroups[action.payload]
            return newState
        }
        default: return state
    }
}
