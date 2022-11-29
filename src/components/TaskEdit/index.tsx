import s from './TaskEdit.module.css'
import { useState, FC, useEffect } from 'react'
import { ITask } from '../../models/ITaks'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { calculateDoneSubTasks } from '../../utils/subtasks'
import { ISubTasks } from '../../models/ISubTasks'
import { Statuses, TStatus } from '../../models/IStatus'
import { translateStatusVal } from '../../utils/language'
import arrowIcon from '../../images/icons/arrow.png'
import { TPriority } from '../../models/TPriority'
import { taskService } from '../../services/taskService'
import { useDispatch } from 'react-redux'
import { ProjectActionTypes } from '../../models/actions/ProjectActionModel'

interface TaskEditProps {
    task: ITask
}

export const TaskEdit: FC<TaskEditProps> = ({ task }) => {
    let {
        title: prevTitle,
        description: prevDescription,
        status: prevStatus,
        priority: prevPriority,
        subtasks: prevSubtasks
    } = task

    const dispatch = useDispatch()

    const { project } = useTypedSelector(state => state.project)
    const { language } = useTypedSelector(state => state.global)

    const [title, setTitle] = useState<string>(prevTitle)
    const [description, setDescription] = useState<string>(prevDescription)
    const [subtasks, setSubtasks] = useState<ISubTasks[]>(prevSubtasks)
    const [status, setStatus] = useState<TStatus>(prevStatus)
    const [priority, setPriority] = useState<TPriority>(prevPriority)

    const [subtaskTitle, setSubtaskTitle] = useState<string>('')
    const [subtaskIsDone, setSubtaskIsDone] = useState<boolean>(false)
    const [isSubtaskTitleUnique, setSubtaskTitleUnique] = useState<boolean>(true)

    const [statusPopupToogle, setStatusPopupToogle] = useState<boolean>(false)

    const addSubtaskHandler = () => {
        setSubtasks(prev => [...prev, {
            title: subtaskTitle,
            isDone: subtaskIsDone
        }])
        setSubtaskTitle('')
    }

    useEffect(() => {
        subtasks.forEach(task => {
            if (task.title === subtaskTitle) {
                setSubtaskTitleUnique(false)
            } else {
                setSubtaskTitleUnique(true)
            }
        })
    }, [subtaskTitle])

    const deleteSubtaskHandler = (title: string) => {
        const helpArr: ISubTasks[] = []
        subtasks.forEach(task => {
            if (task.title !== title) {
                helpArr.push(task)
            }
        })
        setSubtasks(helpArr)
    }

    const setTaskActivity = (title: string) => {
        const helpArr: ISubTasks[] = []
        subtasks.forEach(task => {
            if (task.title === title) {
                task.isDone = !task.isDone
            }
            helpArr.push(task)
        })
        setSubtasks(helpArr)
    }

    const priorityHandler = () => {
        if (priority === 1) {
            setPriority(2)
        } else if (priority === 2) {
            setPriority(3)
        } else {
            setPriority(1)
        }
    }

    const updateTask = async () => {
        const props = {
            ...task,
            title: title,
            description: description,
            subtasks: subtasks,
            priority: priority,
            status: status
        }
        await taskService.updateTask(dispatch, props, project._id)
        dispatch({ type: ProjectActionTypes.SET_CHOOSEN_TASK, payload: null })
    }

    return (
        <div>
            <div className={s.title_wrapper}>
                <label
                    htmlFor="edit-task-title"
                    className={s.title_label}
                >
                    {language.title}
                </label>
                <input
                    id='edit-task-title'
                    maxLength={20}
                    className={s.title_input}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className={s.top_wrapper}>
                <div className={s.col_1}>
                    <label
                        htmlFor="edit-task-description"
                        className={s.description_label}
                    >
                        {language.description}
                    </label>
                    <textarea
                        rows={6}
                        id="edit-task-description"
                        maxLength={200}
                        className={s.description_input}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className={s.col_2}>
                    <div className={s.sub_tasks_info}>
                        <p className={s.sub_heading}>{language.taskPopup.total_subtasks}: {subtasks.length}</p>
                        <p className={s.sub_heading}>{language.done}: {calculateDoneSubTasks(subtasks, language.of)}</p>
                    </div>
                    <div className={s.add_sub_task}>
                        <button
                            className={s.add_sub_task_button}
                            onClick={addSubtaskHandler}
                            disabled={subtaskTitle.length === 0 || subtasks.length > 4 || !isSubtaskTitleUnique}
                        >
                            {language.editTask.add}
                        </button>
                        <input
                            type="text"
                            onChange={(e) => setSubtaskTitle(e.target.value)}
                            value={subtaskTitle}
                            className={s.subtask_input}
                            placeholder={language.title}
                        />
                        <p className={s.ended}>{language.done}? </p>
                        <button
                            className={s.isDone_button}
                            onClick={() => setSubtaskIsDone(!subtaskIsDone)}
                            style={{ color: subtaskIsDone ? 'var(--color-secondary)' : 'var(--color-white)' }}
                        >
                            ✓
                        </button>
                    </div>
                    {subtasks.map(task => {
                        return (
                            <div
                                key={task.title}
                                className={s.sub_task}
                            >
                                <button
                                    className={s.delete_subtask_button}
                                    onClick={() => deleteSubtaskHandler(task.title)}
                                >
                                    {language.editTask.delete}
                                </button>
                                <p className={s.subtask_title}>{task.title}</p>
                                <p className={s.ended}>{language.done}?</p>
                                <button
                                    className={s.isDone_button}
                                    onClick={() => setTaskActivity(task.title)}
                                    style={{ color: task.isDone ? 'var(--color-secondary)' : 'var(--color-white)' }}
                                >
                                    ✓
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={s.mid_wrapper}>
                <div className={s.status}>
                    {language.editTask.set_status}:
                    <span>
                        {translateStatusVal(status, language.mark)}
                        <img
                            className={s.arrow_button}
                            src={arrowIcon}
                            alt="arrow"
                            onClick={() => setStatusPopupToogle(!statusPopupToogle)}
                            style={statusPopupToogle ? {} : { rotate: '180deg' }}
                        />
                    </span>
                    {statusPopupToogle && <div className={s.status_popup}>
                        {Statuses.map(status =>
                            <button
                                key={status}
                                className={s.status_button}
                                onClick={() => [setStatus(status), setStatusPopupToogle(false)]}
                            >
                                {translateStatusVal(status, language.mark)}
                            </button>)}
                    </div>}
                </div>
                <p className={s.status}>
                    {language.editTask.set_priority}:
                    <span
                        className={s.priority}
                        onClick={priorityHandler}
                    >
                        {priority}
                    </span>
                </p>
            </div>
            <button
                className={s.update_button}
                disabled={title.length === 0}
                onClick={updateTask}
            >
                {language.editTask.update_task}
            </button>
        </div>
    )
}