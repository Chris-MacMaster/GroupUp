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

export const fetchGroupsSearch = () => async dispatch => {
    // perhaps will need parameters
    const response = await fetch('/api/all-search/groups')

    if (response.ok) {
        const searchResults = await response.json()
        dispatch(actionLoadGroupResults(searchResults))
        return searchResults
    }
}


export const fetchEventsSearch = () => async dispatch => {
    const response = await fetch('/api/all-search/events')

    if (response.ok) {
        const searchResults = await response.json()
        dispatch(actionLoadEventResults(searchResults))
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
