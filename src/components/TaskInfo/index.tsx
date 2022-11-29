import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ITask } from '../../models/ITaks'
import { convertToHours, formatDate } from '../../utils/date'
import { translateStatusVal } from '../../utils/language'
import { calculateDoneSubTasks } from '../../utils/subtasks'
import s from './TaskInfo.module.css'
import { FC } from 'react'

interface TaskInfoProps {
    task: ITask
}

export const TaskInfo: FC<TaskInfoProps> = ({ task }) => {
    const { language } = useTypedSelector(state => state.global)
    let {
        title,
        num,
        description,
        status,
        createdAt,
        priority,
        developmentTime,
        dateDone,
        subtasks,
        movedToDevelopment
    } = task

    let devTime = convertToHours(developmentTime, movedToDevelopment)

    return (
        <div>
            <p className={s.heading}>{title}<span>#{num}</span></p>
            <div className={s.top_wrapper}>
                <p className={s.status}>{language.status}: <span>{translateStatusVal(status, language.mark)}</span></p>
                <p className={s.created}>{language.taskPopup.created}: <span>{formatDate(createdAt)}</span></p>
            </div>
            <div className={s.mid_wrapper}>
                <div className={s.sub_tasks_wrapper}>
                    <div className={s.sub_tasks_info}>
                        <p className={s.sub_heading}>{language.taskPopup.total_subtasks}: {subtasks.length}</p>
                        <p className={s.sub_heading}>{language.taskPopup.done}: {calculateDoneSubTasks(subtasks, language.of)}</p>
                    </div>
                    {subtasks.map(st => {
                        return (
                            <div
                                key={st.title}
                                className={s.subtask}
                            >
                                {st.title}{st.isDone && <span>✓</span>}
                            </div>
                        )
                    })}
                </div>
                <p className={s.description}><span>{language.description}:<br /></span> {description}</p>
            </div>
            <div className={s.bot_wrapper}>
                <div className={s.info_box}>
                    <p className={s.label}>{language.taskPopup.development_time}</p>
                    <p className={s.value}>{devTime.value} {devTime.type === 'h' ? language.taskPopup.hour : language.taskPopup.min}.</p>
                </div>
                <div className={s.info_box}>
                    <p className={s.label}>{language.priority}</p>
                    <p className={s.value}>{priority}</p>
                </div>
                {dateDone && <div className={s.info_box}>
                    <p className={s.label}>{language.done}</p>
                    <p className={s.value}>{formatDate(dateDone)}</p>
                </div>}
            </div>
        </div>
    )
}