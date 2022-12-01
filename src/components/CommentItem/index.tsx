import { IComment } from '../../models/IComment'
import s from './CommentItem.module.css'
import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { formatDate } from '../../utils/date'
import { commentsService } from '../../services/commentsService'
import { DeleteCommentRequest } from '../../models/request/DeleteComment'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { CreateCommentRequest } from '../../models/request/CreateComment'

interface CommentItemProps {
    parrentId: string
    comment: IComment
    nest: number
    setUpdatedComments: Dispatch<SetStateAction<IComment[]>>
}

export const CommentItem: FC<CommentItemProps> = ({
    comment,
    parrentId,
    nest,
    setUpdatedComments
}) => {
    const [childrenComments, setChildrenComments] = useState<IComment[]>([])
    const [isReplyMode, setReplyMode] = useState<boolean>(false)
    const [isShowingMore, setShowingMore] = useState<boolean>(false)
    const [replyText, setReplyText] = useState<string>('')

    const { language } = useTypedSelector(state => state.global)
    const dispatch = useDispatch()

    const { _id, email, text, children, createdAt } = comment
    const { project } = useTypedSelector(state => state.project)

    useEffect(() => {
        const fetchMoreCommentsHandler = async () => {
            const data = await commentsService.getMany(dispatch, children)
            if (data) {
                setChildrenComments(data)
            }
        }
        fetchMoreCommentsHandler()
    }, [])

    const addCommentHandler = async () => {
        const props: CreateCommentRequest = {
            isChildOfTask: false,
            text: replyText,
            parrentId: _id
        }
        const newComment = await commentsService.create(dispatch, props)
        if (newComment) {
            setChildrenComments(prev => [newComment, ...prev])
        }
        setReplyMode(false)
        setReplyText('')
    }

    const deleteCommentHandler = async () => {
        const props: DeleteCommentRequest = {
            _id: _id,
            isChildOfTask: nest === 0,
            parrentId: parrentId,
            project: project
        }
        try {
            await commentsService.delete(dispatch, props)
            setUpdatedComments(prev => prev.filter(comment => comment._id !== _id))
        } catch (e) {

        }
    }
    return (
        <div
            className={s.section}
            style={{ marginLeft: nest * 5 + 'px', marginRight: nest !== 0 ? '10px' : 0 }}
        >
            <div className={s.info_wrapper}>
                <p className={s.email}>{language.comments.by} {email}</p>
                <p className={s.created}>{formatDate(createdAt)}</p>
            </div>
            <p className={s.text}>{text}</p>
            <div className={s.button_wrapper}>
                {childrenComments.length !== 0 && !isShowingMore && <button
                    onClick={() => setShowingMore(true)}
                    className={s.button}
                >
                    {language.comments.more} ({childrenComments.length})
                </button>}
                {childrenComments.length !== 0 && isShowingMore && <button
                    onClick={() => setShowingMore(false)}
                    className={s.button}
                >
                    {language.comments.hide}
                </button>}
                <button
                    className={s.button}
                    onClick={() => setReplyMode(true)}
                >
                    {language.comments.reply}
                </button>
                <button
                    className={s.button}
                    onClick={deleteCommentHandler}
                >
                    {language.comments.delete}
                </button>
            </div>
            <div className={s.children}>
                {isReplyMode && <div
                    className={s.add_comment_wrapper}
                    style={{ marginLeft: nest + 1 * 15 + 'px' }}
                >
                    <p className={s.add_comment_title}>  {language.comments.add_comment}</p>
                    <textarea
                        placeholder={language.comments.enter_your_comment}
                        className={s.input}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={2}
                    />
                    <div className={s.button_wrapper}>
                        <button
                            className={s.button}
                            onClick={() => [addCommentHandler(), setShowingMore(true)]}
                        >
                            {language.comments.send}
                        </button>
                        <button
                            className={s.button}
                            onClick={() => setReplyMode(false)}
                        >
                            {language.comments.cancel}
                        </button>
                    </div>
                </div>}
                {isShowingMore && childrenComments.map(comment => {
                    return (
                        <CommentItem
                            key={comment._id}
                            nest={nest + 1}
                            comment={comment}
                            parrentId={_id}
                            setUpdatedComments={setChildrenComments}
                        />
                    )
                })}
            </div>
        </div>
    )
}