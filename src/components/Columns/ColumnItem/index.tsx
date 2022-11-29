import s from '../Column.module.css'
import { FC, DragEvent, useState, Dispatch, SetStateAction, useEffect } from 'react'
import { IColumn } from '../../../models/IColumn'
import { ITask } from '../../../models/ITaks'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { taskService } from '../../../services/taskService'
import { useDispatch } from 'react-redux'
import { UpdateColumnsRequest } from '../../../models/request/UpdateColumnsRequest'
import { ProjectActionTypes } from '../../../models/actions/ProjectActionModel'
import { sortByField } from '../../../utils/sort'
import arrowIcon from '../../../images/icons/arrow.png'
import { columnFilterProps, orderProps, TColumnFilter, TOrder } from '../../../models/TSort'
import { calculatePagginationArray } from '../../../utils/paggination'
import { translateOrderVal, translateSortByVal, translateStatusValShort } from '../../../utils/language'
import { defineOtherCols } from '../../../utils/column'

interface ColumnProps {
    column: IColumn
    columns: IColumn[]
    currentTask: ITask | undefined
    setCurrentTask: Dispatch<SetStateAction<ITask | undefined>>
    currentColumn: IColumn | undefined
    setCurrentColumn: Dispatch<SetStateAction<IColumn | undefined>>
}

export const ColumnItem: FC<ColumnProps> = ({
    column,
    currentTask,
    setCurrentTask,
    currentColumn,
    setCurrentColumn,
    columns
}) => {
    const { project } = useTypedSelector(state => state.project)
    const { language } = useTypedSelector(state => state.global)
    const dispatch = useDispatch()

    const [filterPopupToogle, setFilterPopupToogle] = useState<boolean>(false)
    const [orderPopupToogle, setOrderPopupToogle] = useState<boolean>(false)

    const [filter, setFilter] = useState<TColumnFilter>('priority')
    const [order, setOrder] = useState<TOrder>('asc')

    const swapTaskHandler = (task: ITask, swapColTitle: string | null) => {
        if (swapColTitle === null) return
        setTimeout(() => dispatch({ type: ProjectActionTypes.SET_CHOOSEN_TASK, payload: null }), 0)
        const currentIndex = column.tasks.indexOf(task)
        column.tasks.splice(currentIndex, 1)
        const swapCol: IColumn = columns.filter(col => col.title === swapColTitle)[0]
        swapCol.tasks.push(task)
        const updateColumns = columns.map(c => {
            if (c.title === column.title) {
                return column
            }
            if (c.title === swapCol.title) {
                return swapCol
            }
            return c
        })
        const props: UpdateColumnsRequest = {
            id: project._id,
            columns: {
                queue: updateColumns[0].tasks.map(t => t._id),
                development: updateColumns[1].tasks.map(t => t._id),
                done: updateColumns[2].tasks.map(t => t._id)
            }
        }
        taskService.updateColumns(dispatch, props)
    }

    const dropTaskHandler = (e: DragEvent<HTMLDivElement>, column: IColumn) => {
        if (currentTask && currentColumn?.tasks) {
            column.tasks.push(currentTask)
            const currentIndex = currentColumn.tasks.indexOf(currentTask)
            currentColumn.tasks.splice(currentIndex, 1)
            const updateColumns = columns.map(c => {
                if (c.title === column.title) {
                    return column
                }
                if (c.title === currentColumn.title) {
                    return currentColumn
                }
                return c
            })
            const props: UpdateColumnsRequest = {
                id: project._id,
                columns: {
                    queue: updateColumns[0].tasks.map(t => t._id),
                    development: updateColumns[1].tasks.map(t => t._id),
                    done: updateColumns[2].tasks.map(t => t._id)
                }
            }
            taskService.updateColumns(dispatch, props)
        }
    }

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const dragStartHandler = (e: DragEvent<HTMLDivElement>, column: IColumn, task: ITask) => {
        setCurrentColumn(column)
        setCurrentTask(task)
        e.currentTarget.style.backgroundColor = 'var(--color-primary)'
    }

    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.backgroundColor = 'var(--color-secondary)'
    }

    const dropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    let title = language.queue

    if (column.title === 'development') {
        title = language.development
    }
    if (column.title === 'done') {
        title = language.done
    }

    let swapButtons = defineOtherCols(column.title, language.mark)

    const [tasks, setTasks] = useState<ITask[]>(sortByField(column.tasks, filter, order))

    const [choosenPage, setChoosenPage] = useState<number>(1)
    const step = 6
    const paggArr = calculatePagginationArray(step, tasks.length)

    useEffect(() => {
        setTasks(sortByField(column.tasks, filter, order))
    }, [filter, order, column])

    return (
        <div
            className={s.section}
            key={column.title}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => [dropTaskHandler(e, column), setChoosenPage(1)]}
        >
            <p className={s.heading}>{title}</p>
            <div className={s.filter_wrapper}>
                <div className={s.filter}>
                    {language.column.sort_by}
                    <span>
                        {translateSortByVal(filter, language.mark)}
                    </span>
                    <img
                        className={s.arrow_button}
                        src={arrowIcon}
                        alt="arrow"
                        onClick={() => setFilterPopupToogle(!filterPopupToogle)}
                        style={filterPopupToogle ? {} : { rotate: '180deg' }}
                    />
                    {filterPopupToogle && <div className={s.popup}>
                        {columnFilterProps.map(f => {
                            return (
                                <button
                                    className={s.popup_item}
                                    key={f}
                                    onClick={() => [setFilter(f), setFilterPopupToogle(false)]}
                                >
                                    {translateSortByVal(f, language.mark)}
                                </button>
                            )
                        })}
                    </div>}
                </div>
                <div className={s.filter}>
                    {language.column.order_by}
                    <span>
                        {translateOrderVal(order, language.mark)}
                    </span>
                    <img
                        className={s.arrow_button}
                        src={arrowIcon}
                        alt="arrow"
                        onClick={() => setOrderPopupToogle(!orderPopupToogle)}
                        style={orderPopupToogle ? {} : { rotate: '180deg' }}
                    />
                    {orderPopupToogle && <div className={s.popup}>
                        {orderProps.map(o => {
                            return (
                                <button
                                    className={s.popup_item}
                                    key={o}
                                    onClick={() => [setOrder(o), setOrderPopupToogle(false)]}
                                >
                                    {translateOrderVal(o, language.mark)}
                                </button>
                            )
                        })}
                    </div>}
                </div>
            </div>
            {tasks.map((task, index) => {
                if (index < choosenPage * step - step || index > choosenPage * step - 1) return
                return (
                    <div
                        onClick={() => dispatch({ type: ProjectActionTypes.SET_CHOOSEN_TASK, payload: task })}
                        draggable={true}
                        key={task._id}
                        className={s.task}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragStart={(e) => dragStartHandler(e, column, task)}
                        onDragEnd={(e) => [dragEndHandler(e), setChoosenPage(1)]}
                        onDrop={(e) => [dropHandler(e), setChoosenPage(1)]}
                    >
                        {swapButtons[0] && <button
                            className={s.swap_left}
                            onClick={() => swapTaskHandler(task, swapButtons[0])}
                        >
                            <img
                                className={s.swap_arrow}
                                src={arrowIcon}
                                alt="swap"
                            />
                            <p>{translateStatusValShort(swapButtons[0], language.mark)}</p>
                        </button>}

                        {swapButtons[1] && <button
                            className={s.swap_right}
                            onClick={() => swapTaskHandler(task, swapButtons[1])}
                        >
                            <p>{translateStatusValShort(swapButtons[1], language.mark)}</p>
                            <img
                                className={s.swap_arrow}
                                src={arrowIcon}
                                alt="swap"
                                style={{ rotate: '90deg' }}
                            />
                        </button>}
                        {task.title}
                        <span>#{task.num}</span>
                    </div>
                )
            })}
            <div className={s.paggination_wrapper}>
                {paggArr.map(num => {
                    return (
                        <button
                            key={num}
                            className={s.paggination_button}
                            style={num === choosenPage ? {
                                backgroundColor: 'var(--color-primary)',
                                color: 'var(--color-white)',
                                border: '3px solid var(--color-primary)'
                            } : {}}
                            onClick={() => (setChoosenPage(num), window.scrollTo(0, 0))}
                        >
                            {num}
                        </button>
                    )
                })}
            </div>
        </div>
    )

}