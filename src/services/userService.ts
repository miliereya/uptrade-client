import { NavigateFunction } from "react-router";
import { Dispatch } from "redux";
import { instance } from '.';
import { GlobalActionTypes } from '../models/actions/GLobalActionModel';
import { UserActionTypes } from '../models/actions/UserActionModel';
import { SignRequest } from '../models/request/SignRequest';
import { AuthResponse } from '../models/response/AuthResponse';

export const userService = {
    async login(dispatch: Dispatch, props: SignRequest) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            dispatch({ type: UserActionTypes.SET_ERROR, payload: null })
            const response = await instance.post<AuthResponse>('user/login', {
                ...props
            })
            localStorage.setItem('access_token', response.data.accessToken)
            dispatch({ type: UserActionTypes.SET_USER, payload: response.data.user })
            dispatch({ type: GlobalActionTypes.SET_AUTH_POPUP_CLOSED })
        } catch (e: any) {
            if (e.response.data.message) {
                dispatch({ type: UserActionTypes.SET_ERROR, payload: e.response.data.message })
            } else {
                dispatch({ type: UserActionTypes.SET_ERROR, payload: 'Unknow error' })
            }
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    },
    async registr(dispatch: Dispatch, props: SignRequest) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            dispatch({ type: UserActionTypes.SET_ERROR, payload: null })
            const response = await instance.post<AuthResponse>('user/registration', {
                ...props
            })
            localStorage.setItem('access_token', response.data.accessToken)
            window.location.reload()
            dispatch({ type: UserActionTypes.SET_USER, payload: response.data.user })
            dispatch({ type: GlobalActionTypes.SET_AUTH_POPUP_CLOSED })
        } catch (e: any) {
            if (e.response.data.message) {
                dispatch({ type: UserActionTypes.SET_ERROR, payload: e.response.data.message })
            } else {
                dispatch({ type: UserActionTypes.SET_ERROR, payload: 'Unknow error' })
            }
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    },
    async logout(dispatch: Dispatch) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            dispatch({ type: UserActionTypes.SET_ERROR, payload: null })
            await instance.post<AuthResponse>('user/logout')
            dispatch({ type: UserActionTypes.SET_USER, payload: null })
            localStorage.removeItem('access_token')
        } catch (e: any) {
            console.log(e)
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    },
    async refresh(dispatch: Dispatch, nav: NavigateFunction) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            dispatch({ type: UserActionTypes.SET_ERROR, payload: null })
            const response = await instance.post<AuthResponse>('user/refresh')
            localStorage.setItem('access_token', response.data.accessToken)
            dispatch({ type: UserActionTypes.SET_USER, payload: response.data.user })
        } catch (e: any) {
            nav('/')
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    }
}