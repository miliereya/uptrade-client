import { IProject } from "../IProject"
import { ITask } from "../ITaks"

export interface ProjectState {
    project: IProject 
    tasks: ITask[]
    choosenTask: ITask | null
}

export enum ProjectActionTypes {
    SET_PROJECT = 'SET_PROJECT',
    SET_TASKS = 'SET_TASKS',
    SET_ALL = 'SET_ALL',
    SET_CHOOSEN_TASK = 'SET_CHOOSEN_TASK'
}

interface SetChoosenTaskAction {
    type: ProjectActionTypes.SET_CHOOSEN_TASK
    payload: ITask | null
}

interface SetProjectAction {
    type: ProjectActionTypes.SET_PROJECT
    payload: IProject
}

interface SetTasksAction {
    type: ProjectActionTypes.SET_TASKS
    payload: ITask[]
}

interface SetAllAction {
    type: ProjectActionTypes.SET_ALL
    payload: {tasks: ITask[], project: IProject}
}


export type ProjectAction = SetProjectAction | SetTasksAction | SetAllAction | SetChoosenTaskAction
