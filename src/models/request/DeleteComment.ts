import { IProject } from "../IProject"

export interface DeleteCommentRequest {
    isChildOfTask: boolean
    _id: string
    parrentId: string
    project: IProject
}