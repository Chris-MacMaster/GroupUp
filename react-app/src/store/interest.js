const LOAD_INTERESTS = "interests/LOAD"

//**Actions */
export const actionLoadInterests = (interests) => {
    return {
        type: LOAD_INTERESTS,
        payload: interests
    }
}

//**Thunks */

//PRODUCTS HOME PAGE
export const fetchInterests = () => async dispatch => {
    const response = await fetch('/api/all-interests/')

    if (response.ok) {
        const interests = await response.json()
        dispatch(actionLoadInterests(interests))
        return interests
    }
}

const initialState = {
    allInterests: {}
}

//**Reducer and Cases */
export default function interestReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_INTERESTS: {
            const newState = { ...state }
            newState.allInterests = action.payload
            return newState
        }
        default: return state
    }
}
