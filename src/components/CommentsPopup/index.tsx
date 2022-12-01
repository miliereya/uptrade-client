import { useTypedSelector } from "../../hooks/useTypedSelector"
import { FullsizePopup } from "../UI/popups/FullsizePopup"
import s from './CommentsPopup.module.css'
import { FC, Dispatch, useState, SetStateAction, useEffect } from 'react'
import { CreateCommentRequest } from "../../models/request/CreateComment"
import { commentsService } from "../../services/commentsService"
import { useDispatch } from "react-redux"
import { IComment } from "../../models/IComment"
import { CommentItem } from "../CommentItem"
import { ProjectActionTypes } from "../../models/actions/ProjectActionModel"

interface CommentsPopupProps {
    commentPopupToolgle: Dispatch<SetStateAction<boolean>>
}

export const CommentsPopup: FC<CommentsPopupProps> = ({ commentPopupToolgle }) => {
    const { language } = useTypedSelector(state => state.global)
    const { choosenTask, tasks } = useTypedSelector(state => state.project)
    const [text, setText] = useState<string>('')
    const [comments, setComments] = useState<IComment[]>([])

    const dispatch = useDispatch()

    const addCommentHandler = async () => {
        if (choosenTask?._id) {
            const props: CreateCommentRequest = {
                isChildOfTask: true,
                text: text,
                parrentId: choosenTask?._id
            }
            const newComment = await commentsService.create(dispatch, props)
            if (newComment) {
                setComments(prev => [newComment, ...prev])
                setText('')
            }
        }
    }

    useEffect(() => {
        const fetchComments = async () => {
            if (!choosenTask?.comments) return
            const data = await commentsService.getMany(dispatch, choosenTask?.comments)
            if (data) {
                setComments(data)
            }
        }
        fetchComments()

    }, [tasks])

    useEffect(() => {
        const wrapper = document.getElementById('comments')
        if (!wrapper) return
        const windowInnerHeight = window.innerHeight
        if (wrapper.clientHeight > windowInnerHeight * 0.45) {
            wrapper.style.overflowY = 'scroll'
            wrapper.style.paddingRight = '10px'
        } else {
            wrapper.style.overflowY = 'hidden'
            wrapper.style.paddingRight = '0'
        }

    }, [document.getElementById('comments')?.clientHeight, comments.length])

    return (
        <div style={{ zIndex: '9930' }}>
            <FullsizePopup setPopupToogle={() => commentPopupToolgle(false)} zIndex='99999'>
                <div className={s.section}>
                    <p className={s.heading}>{language.comments.comments} ({comments.length})</p>
                    <div className={s.comments_wrapper} id='comments'>
                        {comments.map(comment => {
                            return (
                                <CommentItem
                                    key={comment._id}
                                    nest={0}
                                    comment={comment}
                                    parrentId={choosenTask?._id ? choosenTask._id : ''}
                                    setUpdatedComments={setComments}
                                />
                            )
                        })}
                    </div>
                    <p className={s.add_comment_title}>{language.comments.add_comment}</p>
                    <textarea
                        placeholder={language.comments.enter_your_comment}
                        className={s.input}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={3}
                    />
                    <button
                        disabled={text.length === 0 || text.length > 200}
                        className={s.add_button}
                        onClick={addCommentHandler}
                    >
                        {language.comments.send}
                    </button>
                </div>
            </FullsizePopup>
        </div>
    )
}