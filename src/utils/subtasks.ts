import { ISubTasks } from "../models/ISubTasks";

export const calculateDoneSubTasks = (subtasks: ISubTasks[], ofStr: string) => {
    const done = subtasks.reduce((val, t) => t.isDone ? ++val : val, 0)
    return `${done} ${ofStr} ${subtasks.length}`
}