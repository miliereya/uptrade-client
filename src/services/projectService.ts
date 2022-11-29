import { Dispatch } from "redux";
import { instance } from '.';
import { GlobalActionTypes } from '../models/actions/GLobalActionModel';
import { ProjectActionTypes } from "../models/actions/ProjectActionModel";
import { UserActionTypes } from '../models/actions/UserActionModel';
import { ProjectRequest } from "../models/request/ProjectRequest";
import { IProjectRef } from "../models/response/ProjectRefResponse";
import { ProjectResponse } from "../models/response/ProjectResponse";

export const projectService = {
    async create(dispatch: Dispatch, props: ProjectRequest) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            const response = await instance.post<IProjectRef[]>('project/create', {
                ...props
            })
            dispatch({ type: UserActionTypes.SET_PROJECTS, payload: response.data })
        } catch (e: any) {
            console.log(e)
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    },
    async get(dispatch: Dispatch, id: string) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            const response = await instance.get<ProjectResponse[]>(`project?id=${id}`)
            if (!response.data) {
                return false
            }
            dispatch({ type: ProjectActionTypes.SET_ALL, payload: response.data })
            return true
        } catch (e: any) {
            return false
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    },
    async update(dispatch: Dispatch, props: ProjectRequest) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            const response = await instance.put<IProjectRef[]>('project/update', {
                ...props
            })
            dispatch({ type: UserActionTypes.SET_PROJECTS, payload: response.data })
        } catch (e: any) {
            console.log(e)
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    },
    async delete(dispatch: Dispatch, id: string) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            const response = await instance.post<IProjectRef[]>('project/delete', {
                id
            })
            dispatch({ type: UserActionTypes.SET_PROJECTS, payload: response.data })
        } catch (e: any) {
            console.log(e)
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    }
}