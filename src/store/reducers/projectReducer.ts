import { ProjectAction, ProjectActionTypes, ProjectState } from "../../models/actions/ProjectActionModel"

const initialState: ProjectState = {
    project: {
        _id: '',
        title: '',
        image: '',
        queue: [],
        development: [],
        done: [],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    tasks: [],
    choosenTask: null
}

export const projectReducer = (state = initialState, action: ProjectAction): ProjectState => {
    switch (action.type) {
        case ProjectActionTypes.SET_TASKS:
            return { ...state, tasks: action.payload }
        case ProjectActionTypes.SET_PROJECT:
            return { ...state, project: action.payload }
        case ProjectActionTypes.SET_ALL:
            return { ...state, ...action.payload }
        case ProjectActionTypes.SET_CHOOSEN_TASK:
            return { ...state, choosenTask: action.payload}
        default:
            return state
    }
}