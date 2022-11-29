import { combineReducers } from "redux";
import { globalReducer } from "./globalReducer";
import { projectReducer } from "./projectReducer";
import { taskReducer } from "./taskReducer";
import { userReducer } from "./userReducer";


export const rootReducer = combineReducers({
    user: userReducer,
    global: globalReducer,
    project: projectReducer,
    task: taskReducer
})

export type RootState = ReturnType<typeof rootReducer>