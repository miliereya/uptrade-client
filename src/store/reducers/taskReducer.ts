import { TaskAction, TaskActionTypes, TaskState } from "../../models/actions/TaskActionModel"

const initialState: TaskState = {
    searchedTasks: []
}

export const taskReducer = (state = initialState, action: TaskAction): TaskState => {
    switch (action.type) {
        case TaskActionTypes.SET_SEARCH_TASKS:
            return { ...state, searchedTasks: action.payload }
        default:
            return state
    }
}