import { IUser } from "../IUser"
import { IProjectRef } from "../response/ProjectRefResponse"

export interface UserState {
    user: IUser | null
    error: string | null
}

export enum UserActionTypes {
    SET_USER = 'SET_USER',
    SET_ERROR = 'SET_ERROR',
    SET_PROJECTS = 'SET_PROJECTS'
}

interface SetUserAction {
    type: UserActionTypes.SET_USER
    payload: IUser | null
}

interface SetErrorAction {
    type: UserActionTypes.SET_ERROR
    payload: string | null
}

interface SetProjectsAction {
    type: UserActionTypes.SET_PROJECTS
    payload: IProjectRef[]
}


export type UserAction = SetUserAction | SetErrorAction | SetProjectsAction
