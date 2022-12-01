import { AddCommentAction, AddCommentActionTypes, AddCommentState } from "../../models/actions/AddCommentActionModel"

const initialState: AddCommentState = {
    replyTo: '',
    nest: 0
}

export const addCommentReducer = (state = initialState, action: AddCommentAction): AddCommentState => {
    switch (action.type) {
        case AddCommentActionTypes.SET_REPLY_TO:
            return { ...action.payload }
        default:
            return state
    }
}