import { en } from "../../languages/en"
import { ru } from "../../languages/ru"
import { GlobalAction, GlobalActionTypes, GlobalState } from "../../models/actions/GLobalActionModel"

let language = ru
let storageLanguage = localStorage.getItem('language')

if (storageLanguage === 'en') {
    language = en
}

const initialState: GlobalState = {
    authPopupToogle: false,
    language: language,
    isLoading: true
}

export const globalReducer = (state = initialState, action: GlobalAction): GlobalState => {
    switch (action.type) {
        case GlobalActionTypes.SET_LANGUAGE:
            return { ...state, language: action.payload }
        case GlobalActionTypes.SET_LOADING_TRUE:
            return { ...state, isLoading: true }
        case GlobalActionTypes.SET_LOADING_FALSE:
            return { ...state, isLoading: false }
        case GlobalActionTypes.SET_AUTH_POPUP_OPENED:
            return { ...state, authPopupToogle: true }
        case GlobalActionTypes.SET_AUTH_POPUP_CLOSED:
            return { ...state, authPopupToogle: false }
        default:
            return state
    }
}