import { IProjectRef } from "./response/ProjectRefResponse"

export interface IUser {
    email?: string
    projects: IProjectRef[]
}