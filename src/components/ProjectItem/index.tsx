import s from './ProjectItem.module.css'
import { IProjectRef } from '../../models/response/ProjectRefResponse'
import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import defaultBackground from '../../images/project-default.jpg'
import editIcon from '../../images/icons/edit.png'
import deleteIcon from '../../images/icons/delete.png'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { projectService } from '../../services/projectService'
import { useDispatch } from 'react-redux'

interface ProjectItemProps {
    project: IProjectRef
}

export const ProjectItem: FC<ProjectItemProps> = ({ project }) => {
    const { language } = useTypedSelector(state => state.global)
    const { _id, title, image } = project
    const [editMode, setEditMode] = useState<boolean>(false)
    const [editTitle, setEditTitle] = useState<string>(title)
    const [editImage, setEditImage] = useState<string>(image)

    const dispatch = useDispatch()

    const updateHandler = async () => {
        const updatedProject = {
            id: _id,
            title: editTitle,
            image: editImage
        }
        await projectService.update(dispatch, updatedProject)
        setEditMode(false)
    }

    const deleteHandler = () => {
        projectService.delete(dispatch, _id)
    }

    return (
        <div className={s.section} style={{ backgroundColor: editMode ? 'var(--color-primary)' : 'var(--color-white)' }}>
            <button
                className={s.edit_button}
                onClick={() => setEditMode(!editMode)}
            >
                <img
                    src={editIcon}
                    alt="edit"
                    className={s.edit_icon}
                />
            </button>
            <button
                className={s.delete_button}
                onClick={deleteHandler}
            >
                <img
                    src={deleteIcon}
                    alt="edit"
                    className={s.delete_icon}
                />
            </button>
            {editMode ?
                <div className={s.input_wrapper}>
                    <label
                        htmlFor="project-title"
                        className={s.label}
                    >
                        {language.projectItem.title}
                    </label>
                    <input
                        id='project-title'
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className={s.input}
                        maxLength={20}
                    />
                    <label
                        htmlFor='project-file'
                        className={s.file_label}
                    >
                        {language.projectItem.background}
                    </label>
                    <input
                        type='file'
                        id='project-file'
                        className={s.file_input}
                    />
                    <div className={s.button_wrapper}>
                        <button
                            className={s.apply_button}
                            onClick={updateHandler}
                            disabled={editTitle.length === 0 || editTitle.length > 20}
                        >
                            {language.projectItem.apply}
                        </button>
                        <button
                            className={s.cancel_button}
                            onClick={() => setEditMode(false)}
                        >
                            {language.projectItem.cancel}
                        </button>
                    </div>
                </div> : <NavLink
                    to={`/project/${_id}`}
                    className={s.title}
                >
                    {title}
                </NavLink>}
            {!editMode && <img
                src={image !== '' ? image : defaultBackground}
                alt={title}
                className={s.img}
            />}
        </div>
    )
}