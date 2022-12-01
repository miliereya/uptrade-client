import { FullsizePopup } from '../../UI/popups/FullsizePopup'
import s from './AddTaskPopup.module.css'
import { FC, Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { taskService } from '../../../services/taskService'

interface AddTaskPopupProps {
    setPopupToogle: Dispatch<SetStateAction<boolean>>
}

export const AddTaskPopup: FC<AddTaskPopupProps> = ({ setPopupToogle }) => {
    const { language } = useTypedSelector(state => state.global)
    const { project } = useTypedSelector(state => state.project)

    const dispatch = useDispatch()

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const AddTaskHandler = async () => {
        const props = {
            task: {
                title,
                description
            },
            projectId: project._id
        }
        await taskService.create(dispatch, props)
        setPopupToogle(false)
    }

    return (
        <FullsizePopup setPopupToogle={() => setPopupToogle(false)}>
            <div className={s.section}>
                <h3 className={s.heading}>{language.addTaskPopup.create_task}</h3>
                <label
                    className={s.label}
                >
                    {language.addTaskPopup.title}
                </label>
                <input
                    className={s.input}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder={language.addTaskPopup.enter_title}
                    maxLength={20}
                />
                <label
                    className={s.label}
                >
                    {language.addTaskPopup.description}
                </label>
                <textarea
                    className={s.input}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder={language.addTaskPopup.enter_description}
                    rows={4}
                    maxLength={100}
                />
                <button
                    onClick={AddTaskHandler}
                    className={s.button}
                    disabled={title.length === 0 || title.length > 20 || description.length > 100}
                    onKeyPress={(e: any) => e.key === 'Enter' && AddTaskHandler()}
                >
                    {language.addTaskPopup.add_task}
                </button>
            </div>
        </FullsizePopup>
    )
}