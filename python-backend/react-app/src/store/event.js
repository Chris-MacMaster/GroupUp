const LOAD_EVENTS = "events/LOAD"
const LOAD_EVENT = "event/LOAD"
const POST_EVENT = "events/POST"
const DELETE_EVENT = "events/DELETE"
// const LOAD_USER_GROUPS = 'groups/LOAD_USER_GROUPS'

//**Actions */
export const actionLoadEvents = (events) => {
    return {
        type: LOAD_EVENTS,
        payload: events
    }
}

export const actionLoadEvent = (event) => {
    return {
        type: LOAD_EVENT,
        payload: event
    }
}

export const actionPostEvent = (event) => {
    return {
        type: POST_EVENT,
        payload: event
    }
}

export const actionDeleteEvent = (id) => {
    return {
        type: DELETE_EVENT,
        payload: id
    }
}


// export const userProducts = products => ({
//     type: LOAD_USER_PRODUCTS,
//     payload: products
// })



//**Thunks */

//PRODUCTS HOME PAGE
export const fetchEvents = () => async dispatch => {
    const response = await fetch('/api/events/')

    if (response.ok) {
        const events = await response.json()
        dispatch(actionLoadEvents(events))
        return events
    }
}

export const fetchOneEvent = (id) => async dispatch => {
    const response = await fetch(`/api/events/${id}/`)
    if (response.ok) {
        const event = await response.json()
        dispatch(actionLoadEvent(event))
        return event
    }
}

// export const fetchUserGroups = () => async dispatch => {
//     const response = await fetch(`/api/groups/current/`)

//     if (response.ok) {
//         const groups = await response.json()
//          return dispatch(loaduserGroups(groups))
//     }
// }

export const makeEvent = (eventBody) => async dispatch => {
    const { name, details, num_going, group_limit, host, format, description, date, strangers, online, saved, group_id } = eventBody
    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({
        name,
        details,
        num_going,
        group_limit,
        host,
        format,
        description,
        date,
        strangers,
        online,
        saved,
        group_id
    })
    const options = { method, headers, body }
    const response = await fetch('/api/events/', options)

    if (response.ok) {
        const event = await response.json()
        return event
    }
}

export const editEvent = (eventBody, eventId) => async dispatch => {
    const { name, details, num_going, group_limit, host, format, description, date, strangers, online, saved, group_id } = eventBody
    const method = "PUT"
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({
        name,
        details,
        num_going,
        group_limit,
        host,
        format,
        description,
        date,
        strangers,
        online,
        saved,
        group_id
    })
    const options = { method, headers, body }
    const response = await fetch(`/api/events/${eventId}/`, options)
    //testing
    if (response.ok) {
        const event = await response.json()
        return event
    }

}

export const deleteEvent = (id) => async dispatch => {
    const method = "DELETE"
    const headers = { "Content-Type": "application/json" }
    const options = { method, headers }
    const response = await fetch(`/api/events/${id}/`, options)

    if (response.ok) {
        const deleteData = await response.json()
        dispatch(actionDeleteEvent(id))
        return deleteData
    }

}

const initialState = {
    allEvents: {},
    singleEvent: {},
    userEvents: {},
}

//**Reducer and Cases */
export default function eventReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_EVENTS: {
            const newState = { ...state }
            newState.allEvents = action.payload
            // resets group details when going to allProducts page
            newState.singleEvent = {}
            return newState
        }
        case LOAD_EVENT: {
            let newState = { ...state, singleEvent: { ...state.singleEvent } }
            newState.singleEvent = { ...action.payload }
            return newState
        }
        // case LOAD_USER_PRODUCTS: {
        //     const newState = { ...state }
        //     // console.log("FDASFDSAFAD", action.payload)
        //     newState.userProducts = { ...action.payload }
        //     return newState
        // }
        case POST_EVENT: {
            const newState = { ...state }
            newState.allEvents[action.payload.id] = action.payload
            return newState
        }

        case DELETE_EVENT: {
            const newState = { ...state }
            delete newState.allEvents[action.payload]
            return newState
        }
        default: return state
    }
}
