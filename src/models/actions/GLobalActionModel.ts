import { ILanguage } from "../global/ILanguage"

export interface GlobalState {
    isLoading: boolean
    language: ILanguage
    authPopupToogle: boolean
}

export enum GlobalActionTypes {
    SET_LOADING_FALSE = 'SET_LOADING_FALSE',
    SET_LOADING_TRUE = 'SET_LOADING_TRUE',
    SET_LANGUAGE = 'SET_LANGUAGE',
    SET_AUTH_POPUP_CLOSED = 'SET_AUTH_POPUP_CLOSED',
    SET_AUTH_POPUP_OPENED =  'SET_AUTH_POPUP_OPENED'
}

interface SetLoadingFalseAction {
    type: GlobalActionTypes.SET_LOADING_FALSE
}

interface SetLoadingTrueAction {
    type: GlobalActionTypes.SET_LOADING_TRUE
}

interface SetLanguageAction {
    type: GlobalActionTypes.SET_LANGUAGE
    payload: ILanguage
}

interface SetAuthPopupClosedAction {
    type: GlobalActionTypes.SET_AUTH_POPUP_CLOSED
}

interface SetAuthPopupOpenedAction {
    type: GlobalActionTypes.SET_AUTH_POPUP_OPENED
}

export type GlobalAction = SetLoadingFalseAction | SetLoadingTrueAction | SetLanguageAction | SetAuthPopupClosedAction | SetAuthPopupOpenedAction
