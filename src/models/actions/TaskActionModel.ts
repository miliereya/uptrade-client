import { ITask } from "../ITaks"

export interface TaskState {
    searchedTasks: ITask[]
}

export enum TaskActionTypes {
    SET_SEARCH_TASKS = 'SET_SEARCH_TASKS'
}

interface SetSearchTasksAction {
    type: TaskActionTypes.SET_SEARCH_TASKS
    payload: ITask[]
}

export type TaskAction = SetSearchTasksAction 
