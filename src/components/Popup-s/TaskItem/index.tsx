import { FullsizePopup } from '../../UI/popups/FullsizePopup'
import s from './TaskPopup.module.css'
import { useState } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { ProjectActionTypes } from '../../../models/actions/ProjectActionModel'
import editIcon from '../../../images/icons/edit.png'
import deleteIcon from '../../../images/icons/delete.png'
import commentsIcon from '../../../images/icons/comments.png'
import { DeleteTaskRequest } from '../../../models/request/DeleteTaskRequest'
import { taskService } from '../../../services/taskService'
import { TaskInfo } from '../../TaskInfo'
import { TaskEdit } from '../../TaskEdit'
import { CommentsPopup } from '../Comments'

export const TaskPopup = () => {
    const { choosenTask, project } = useTypedSelector(state => state.project)
    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState<boolean>(false)
    const [commentsPopupToogle, setCommentsPopupToogle] = useState<boolean>(false)

    if (!choosenTask) {
        return <div></div>
    }

    const { _id, } = choosenTask

    const deleteHandler = async () => {
        const props: DeleteTaskRequest = {
            projectId: project._id,
            id: _id
        }
        await taskService.deleteTask(dispatch, props)
        dispatch({ type: ProjectActionTypes.SET_CHOOSEN_TASK, payload: null })
    }

    return (
        <>
            {commentsPopupToogle && <CommentsPopup commentPopupToolgle={setCommentsPopupToogle} />}
            <FullsizePopup setPopupToogle={() => dispatch({ type: ProjectActionTypes.SET_CHOOSEN_TASK, payload: null })}>
                <div className={s.section}>
                    <div className={s.button_wrapper}>
                        <button
                            className={s.comments_button}
                            onClick={() => setCommentsPopupToogle(true)}
                        >
                            <img
                                src={commentsIcon}
                                alt="comments"
                                className={s.comments_icon}
                            />
                        </button>
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
                    </div>
                    {editMode ?
                        <TaskEdit
                            task={choosenTask}
                        />
                        :
                        <TaskInfo
                            task={choosenTask}
                        />}

                </div>
            </FullsizePopup>
        </>
    )
}