import s from './Column.module.css'
import { FC, useState } from 'react'
import { IColumn } from '../../models/IColumn'
import { ITask } from '../../models/ITaks'

import { ColumnItem } from './ColumnItem'

interface ColumnsProps {
    columns: IColumn[]
}

export const Columns: FC<ColumnsProps> = ({ columns }) => {
    const [currentColumn, setCurrentColumn] = useState<IColumn>()
    const [currentTask, setCurrentTask] = useState<ITask>()


    return (
        <div className={s.wrapper}>
            {columns.map(column => {
                return (
                    <ColumnItem
                        key={column.title}
                        column={column}
                        columns={columns}
                        currentTask={currentTask}
                        setCurrentTask={setCurrentTask}
                        currentColumn={currentColumn}
                        setCurrentColumn={setCurrentColumn}
                    />
                )
            })}
        </div>
    )
}