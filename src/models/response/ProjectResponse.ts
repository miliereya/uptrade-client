import { IProject } from "../IProject";
import { ITask } from "../ITaks";

export interface ProjectResponse {
    tasks: ITask[]
    project: IProject
}