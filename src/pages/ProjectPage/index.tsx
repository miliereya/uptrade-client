import { useLocation, useNavigate } from 'react-router'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import s from './ProjectPage.module.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { projectService } from '../../services/projectService'
import { formatDate } from '../../utils/date'
import { sortTasksByColumns } from '../../utils/sort'
import { Columns } from '../../components/Columns'
import { AddTaskPopup } from '../../components/Popup-s/AddTask'
import { TaskPopup } from '../../components/Popup-s/TaskItem'
import { TaskSearch } from '../../components/TaskSearch'

export const ProjectPage = () => {
    const { user } = useTypedSelector(state => state.user)
    const { project, tasks, choosenTask } = useTypedSelector(state => state.project)
    const { isLoading, language } = useTypedSelector(state => state.global)
    const [AddTaskPopupToogle, setAddTaskPopupToogle] = useState<boolean>(false)

    const nav = useNavigate()
    const dispatch = useDispatch()
    const id = useLocation().pathname.slice(9)

    useEffect(() => {
        if (user && !isLoading) {
            const getProject = async () => {
                const isValid = await projectService.get(dispatch, id)
                if (!isValid) {
                    nav('/')
                }
            }
            getProject()
        } else if (!user && !isLoading) {
            nav('/')
        }
    }, [user])

    let { title, createdAt, updatedAt, queue, development, done } = project

    const columns = sortTasksByColumns(tasks, queue, development, done)

    return (
        <>
            {choosenTask && <TaskPopup />}
            {AddTaskPopupToogle && <AddTaskPopup setPopupToogle={setAddTaskPopupToogle} />}
            <div className="container">
                <div className={s.section}>
                    <div className={s.info_wrapper}>
                        <p className={s.heading}>{title}</p>
                        <div className={s.date_wrapper}>
                            <p className={s.date}>{language.projectPage.created}:<span> {formatDate(createdAt)}</span></p>
                            <p className={s.date}>{language.projectPage.last_updated}:<span> {formatDate(updatedAt)}</span></p>
                        </div>
                    </div>
                    <div className={s.top_wrapper}>
                        <button
                            className={s.add_button}
                            onClick={() => setAddTaskPopupToogle(true)}
                        >
                            {language.projectPage.add_task}
                        </button>
                        <TaskSearch />
                    </div>
                    <Columns columns={columns} />
                </div>
            </div>
        </>
    )
}

