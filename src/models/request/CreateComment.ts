import { IProject } from "../IProject"

export interface CreateCommentRequest {
    isChildOfTask: boolean
    text: string
    parrentId: string
}