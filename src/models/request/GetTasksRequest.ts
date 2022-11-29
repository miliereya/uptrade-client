import { TFilter } from "../TSort"

export interface GetTasksRequest {
    queue: string[]
    development: string[]
    done: string[]
    val: string
    searchType: TFilter
}