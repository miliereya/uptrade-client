import { Dispatch } from "redux";
import { instance } from '.';
import { GlobalActionTypes } from "../models/actions/GLobalActionModel";
import { ProjectActionTypes } from "../models/actions/ProjectActionModel";
import { TaskActionTypes } from "../models/actions/TaskActionModel";
import { ITask } from "../models/ITaks";
import { DeleteTaskRequest } from "../models/request/DeleteTaskRequest";
import { GetTasksRequest } from "../models/request/GetTasksRequest";
import { TaskCreateRequest } from "../models/request/TaskCreateRequest";
import { UpdateColumnsRequest } from "../models/request/UpdateColumnsRequest";
import { ProjectResponse } from "../models/response/ProjectResponse";

export const taskService = {
    async create(dispatch: Dispatch, props: TaskCreateRequest) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            const response = await instance.post<ProjectResponse>('project/tasks/create', {
                ...props
            })
            dispatch({ type: ProjectActionTypes.SET_ALL, payload: response.data })
        } catch (e: any) {
            console.log(e)
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    },
    async updateTask(dispatch: Dispatch, props: ITask, projectId: string) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            const response = await instance.put<ITask[]>('project/tasks/update_task', {
                props,
                projectId
            })
            dispatch({ type: ProjectActionTypes.SET_ALL, payload: response.data })
            dispatch({ type: TaskActionTypes.SET_SEARCH_TASKS, payload: [] })
        } catch (e: any) {
            console.log(e)
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    },

    async get(dispatch: Dispatch, props: GetTasksRequest) {
        try {
            const response = await instance.post<ITask[]>('project/tasks/get', {
                ...props
            })
            dispatch({ type: TaskActionTypes.SET_SEARCH_TASKS, payload: response.data })
        } catch (e: any) {
            console.log(e)
        }
    },
    async updateColumns(dispatch: Dispatch, props: UpdateColumnsRequest) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            const response = await instance.put<ProjectResponse>('project/tasks/update_columns', {
                ...props
            })
            dispatch({ type: ProjectActionTypes.SET_PROJECT, payload: response.data })
            dispatch({ type: TaskActionTypes.SET_SEARCH_TASKS, payload: [] })
        } catch (e: any) {
            console.log(e)
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    },

    async deleteTask(dispatch: Dispatch, props: DeleteTaskRequest) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            const response = await instance.post<ProjectResponse>('project/tasks/delete', {
                ...props
            })
            dispatch({ type: ProjectActionTypes.SET_ALL, payload: response.data })
            dispatch({ type: TaskActionTypes.SET_SEARCH_TASKS, payload: [] })
        } catch (e: any) {
            console.log(e)
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    },
}