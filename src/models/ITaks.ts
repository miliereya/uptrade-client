import { TStatus } from "./IStatus"
import { ISubTasks } from "./ISubTasks"
import { TPriority } from "./TPriority"

export interface ITask {
    _id: string
    num: string
    title: string
    description: string
    developmentTime: 0
    priority: TPriority
    status: TStatus
    files: []
    dateDone?: Date
    movedToDevelopment?: Date
    subtasks: ISubTasks[]
    createdAt: Date
    updatedAt: Date
}