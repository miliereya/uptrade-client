import { FullsizePopup } from '../../UI/popups/FullsizePopup'
import s from './AddProjectPopup.module.css'
import { useState, FC, Dispatch, SetStateAction } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { projectService } from '../../../services/projectService'
import { useDispatch } from 'react-redux'

interface AddProjectPopupProps {
    setPopupToogle: Dispatch<SetStateAction<boolean>>
}

export const AddProjectPopup: FC<AddProjectPopupProps> = ({ setPopupToogle }) => {
    const { language } = useTypedSelector(state => state.global)
    const dispatch = useDispatch()
    const [title, setTitle] = useState<string>('')
    const [image, setImage] = useState<string>('')

    const addProjectHandler = async () => {
        const project = {
            title,
            image
        }
        await projectService.create(dispatch, project)
        setPopupToogle(false)
    }

    return (
        <FullsizePopup setPopupToogle={() => setPopupToogle(false)}>
            <div className={s.section}>
                <h3 className={s.heading}>{language.addProjectPopup.create_new_project}</h3>
                <label
                    htmlFor="project-title"
                    className={s.label}
                >
                    {language.addProjectPopup.title}
                </label>
                <input
                    id='project-title'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={s.input}
                    maxLength={20}
                    placeholder={language.addProjectPopup.enter_title}
                />
                <label
                    htmlFor='project-file'
                    className={s.file_label}
                >
                    {language.addProjectPopup.add_background}
                </label>
                <input
                    type='file'
                    id='project-file'
                    className={s.file_input}
                />
                <button
                    className={s.button}
                    onClick={addProjectHandler}
                    disabled={title.length === 0 || title.length > 20}
                    onKeyPress={(e: any) => e.key === 'Enter' && addProjectHandler()}
                >
                    {language.addProjectPopup.create}
                </button>
            </div>
        </FullsizePopup>
    )
}