const LOAD_GROUP_SEARCH = "search/groups/LOAD"
const LOAD_EVENT_SEARCH = "search/events/LOAD"

//**Actions */
export const actionLoadGroupResults = (searchResults) => {
    return {
        type: LOAD_GROUP_SEARCH,
        payload: searchResults
    }
}

export const actionLoadEventResults = (searchResults) => {
    return {
        type: LOAD_EVENT_SEARCH,
        payload: searchResults
    }
}

//**Thunks */

export const fetchSearchResults = () => async dispatch => {
    // perhaps will need parameters
    // one db connection, then dispatch two actions into state, one for groups and one for events
    const response = await fetch('/api/search/')

    if (response.ok) {
        const searchResults = await response.json()
        // get back an object with groups, events as arrays of objects for mapping purposes
        // two keys. 1 is groups and 2 is events
        dispatch(actionLoadGroupResults(searchResults[1]))
        dispatch(actionLoadEventResults(searchResults[2]))
        return searchResults
    }
}

const initialState = {
    allGroups: {},
    allEvents: {}
}

//**Reducer and Cases */
export default function searchReducer(state = initialState, action) {

    switch (action.type) {
        // perhaps split into groups and events
        case LOAD_GROUP_SEARCH: {
            const newState = { allGroups: {...state.allGroups}, allEvents: {...state.allEvents} }
            newState.allGroups = action.payload
            return newState
        }

        case LOAD_EVENT_SEARCH: {
            const newState = { allGroups: { ...state.allGroups }, allEvents: { ...state.allEvents } }
            newState.allEvents = action.payload
            return newState
        }
        
        default: return state
    }
}
