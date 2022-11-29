import { TFilter } from '../../models/TSort'
import s from './TaskSearch.module.css'
import { useState, useEffect } from 'react'
import { taskService } from '../../services/taskService'
import { GetTasksRequest } from '../../models/request/GetTasksRequest'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ProjectActionTypes } from '../../models/actions/ProjectActionModel'
import { useDispatch } from 'react-redux'
import { DebounceInput } from 'react-debounce-input'
import { TaskActionTypes } from '../../models/actions/TaskActionModel'
import { translateSearchVal } from '../../utils/language'

export const TaskSearch = () => {
    const [filter, setFilter] = useState<TFilter>('title')
    const [search, setSearch] = useState<string>('')
    const { searchedTasks: tasks } = useTypedSelector(state => state.task)

    const { language } = useTypedSelector(state => state.global)
    const { project } = useTypedSelector(state => state.project)

    const dispatch = useDispatch()

    useEffect(() => {
        if (search.length !== 0) {
            const props: GetTasksRequest = {
                queue: project.queue,
                development: project.development,
                done: project.done,
                val: search,
                searchType: filter
            }
            taskService.get(dispatch, props)
        } else {
            dispatch({ type: TaskActionTypes.SET_SEARCH_TASKS, payload: [] })
        }
    }, [search, filter])

    return (
        <div className={s.section}>
            <DebounceInput
                className={s.input}
                type="text"
                placeholder={`${language.search}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                debounceTimeout={200}
            />
            {search.length < 3 && <div className={s.filter_wrapper}>
                <p>
                    {language.search_by}:
                    <span
                        onClick={() => filter === 'num' ? setFilter('title') : setFilter('num')}
                    >
                        {translateSearchVal(filter, language.mark)}
                    </span>
                </p>
            </div>}
            {tasks.length !== 0 && <div className={s.task_wrapper}>
                {tasks.map(task => {
                    return (
                        <div
                            onClick={() => dispatch({ type: ProjectActionTypes.SET_CHOOSEN_TASK, payload: task })}
                            key={task._id}
                            className={s.task}
                        >
                            {task.title}
                            <span>#{task.num}</span>
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}