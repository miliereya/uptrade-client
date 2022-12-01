export interface AddCommentState {
    replyTo: string
    nest: number
}

export enum AddCommentActionTypes {
    SET_REPLY_TO = 'SET_REPLY_TO'
}

interface SetReplyToAction {
    type: AddCommentActionTypes.SET_REPLY_TO
    payload: AddCommentState
}

export type AddCommentAction = SetReplyToAction 
