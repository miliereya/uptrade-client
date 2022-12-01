import { Dispatch } from "redux";
import { instance } from '.';
import { GlobalActionTypes } from '../models/actions/GLobalActionModel';
import { ProjectActionTypes } from "../models/actions/ProjectActionModel";
import { IComment } from "../models/IComment";
import { ITask } from "../models/ITaks";
import { CreateCommentRequest } from "../models/request/CreateComment";
import { DeleteCommentRequest } from "../models/request/DeleteComment";

export const commentsService = {
    async create(dispatch: Dispatch, props: CreateCommentRequest) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            const response = await instance.post<IComment>('project/comments/create', {
                ...props
            })
            return response.data
        } catch (e: any) {
            console.log(e)
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    },
    async getMany(dispatch: Dispatch, ids: string[]) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            const response = await instance.post<IComment[]>('project/comments/get', {
                ids
            })
            return response.data
        } catch (e: any) {
            console.log(e)
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    },
    async delete(dispatch: Dispatch, props: DeleteCommentRequest) {
        try {
            dispatch({ type: GlobalActionTypes.SET_LOADING_TRUE })
            await instance.post<IComment[]>('project/comments/delete', {
                ...props
            })
        } catch (e: any) {
            console.log(e)
        } finally {
            dispatch({ type: GlobalActionTypes.SET_LOADING_FALSE })
        }
    },
}