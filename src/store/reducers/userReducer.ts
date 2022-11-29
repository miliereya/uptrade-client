import { UserAction, UserActionTypes, UserState } from "../../models/actions/UserActionModel"

const initialState: UserState = {
    user: null,
    error: null
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return { user: action.payload, error: null }
        case UserActionTypes.SET_ERROR:
            return { user: null, error: action.payload }
        case UserActionTypes.SET_PROJECTS:
            return { user: { ...state.user, projects: action.payload }, error: null }
        default:
            return state
    }
}