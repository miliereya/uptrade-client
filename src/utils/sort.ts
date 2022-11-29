import { IColumn } from "../models/IColumn";
import { ITask } from "../models/ITaks";
import { TOrder } from "../models/TSort";


const matchId = (column: string[], tasks: ITask[]) => {
    let filledColumn: ITask[] = []
    for (let i = 0; i < column.length; i++) {
        for (let l = 0; l < tasks.length; l++) {
            if (column[i] === tasks[l]._id) {
                filledColumn.push(tasks[l])
            }
        }
    }
    return filledColumn
}

export const sortTasksByColumns = (tasks: ITask[], queue: string[], development: string[], done: string[]): IColumn[] => {
    return [
        { title: 'queue', tasks: matchId(queue, tasks) },
        { title: 'development', tasks: matchId(development, tasks) },
        { title: 'done', tasks: matchId(done, tasks) }
    ]
}

export const sortByField = (arr: any[], field: string, order: TOrder) => {
    const setOrder = () => {
        if (order === 'asc') {
            return (a: any, b: any) => a[field] > b[field] ? 1 : -1
        } else {
            return (a: any, b: any) => a[field] < b[field] ? 1 : -1
        }
    }
    return arr.sort(setOrder())
}